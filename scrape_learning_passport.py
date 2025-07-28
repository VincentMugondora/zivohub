import requests
from bs4 import BeautifulSoup
import csv
import os
import time
from urllib.parse import urljoin, urlparse

BASE_URL = 'https://zimbabwe.learningpassport.org/'
OUTPUT_CSV = 'learning_passport_resources.csv'
DOWNLOAD_DIR = 'learning_passport_downloads'
HEADERS = {'User-Agent': 'Mozilla/5.0'}

def get_soup(url):
    resp = requests.get(url, headers=HEADERS)
    resp.raise_for_status()
    return BeautifulSoup(resp.text, 'html.parser')

def is_valid_resource_link(href):
    # Update this logic based on actual resource URLs
    return href and ('.pdf' in href or '/resource/' in href or '/books/' in href)

def get_all_resource_links():
    soup = get_soup(BASE_URL)
    links = set()
    for a in soup.find_all('a', href=True):
        href = urljoin(BASE_URL, a['href'])
        if is_valid_resource_link(href):
            links.add(href)
    return list(links)

def extract_resource_info(resource_url):
    soup = get_soup(resource_url)
    title = soup.title.string.strip() if soup.title else resource_url
    # Try to find a direct download link (PDF, etc.)
    download_link = None
    for a in soup.find_all('a', href=True):
        if '.pdf' in a['href']:
            download_link = urljoin(resource_url, a['href'])
            break
    return {
        'title': title,
        'page_url': resource_url,
        'download_url': download_link
    }

def download_file(url, out_dir):
    local_filename = os.path.join(out_dir, os.path.basename(urlparse(url).path))
    with requests.get(url, headers=HEADERS, stream=True) as r:
        r.raise_for_status()
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
    return local_filename

def main():
    os.makedirs(DOWNLOAD_DIR, exist_ok=True)
    all_links = get_all_resource_links()
    print(f'Found {len(all_links)} resource pages.')
    resources = []
    for idx, link in enumerate(all_links):
        print(f'[{idx+1}/{len(all_links)}] Scraping: {link}')
        try:
            info = extract_resource_info(link)
            resources.append(info)
            if info['download_url']:
                print(f'  Downloading: {info[\"download_url\"]}')
                download_file(info['download_url'], DOWNLOAD_DIR)
            time.sleep(1)  # Be polite!
        except Exception as e:
            print(f'  Error: {e}')
    # Save metadata to CSV
    with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=['title', 'page_url', 'download_url'])
        writer.writeheader()
        for res in resources:
            writer.writerow(res)
    print(f'Done! Metadata saved to {OUTPUT_CSV}, files in {DOWNLOAD_DIR}/')

if __name__ == '__main__':
    main()