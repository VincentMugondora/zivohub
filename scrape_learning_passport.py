import requests
from bs4 import BeautifulSoup
import csv
import time
from urllib.parse import urljoin

BASE_URL = 'https://www.zimsake.co.zw/practice-exams'
HEADERS = {'User-Agent': 'Mozilla/5.0'}

def get_soup(url):
    resp = requests.get(url, headers=HEADERS)
    resp.raise_for_status()
    return BeautifulSoup(resp.text, 'html.parser')

def get_exam_links():
    soup = get_soup(BASE_URL)
    links = []
    for a in soup.find_all('a', href=True):
        if 'start-exam' in a['href'] or a.text.strip().lower() == 'start exam':
            full_url = urljoin(BASE_URL, a['href'])
            links.append(full_url)
    return list(set(links))  # Remove duplicates

def extract_exam_info(exam_url):
    soup = get_soup(exam_url)
    title = soup.find('h1') or soup.find('h2') or soup.title
    title = title.text.strip() if title else exam_url
    # You can add more parsing here for marks, duration, etc.
    # If there is a PDF or download link, find it:
    pdf_link = None
    for a in soup.find_all('a', href=True):
        if '.pdf' in a['href']:
            pdf_link = urljoin(exam_url, a['href'])
            break
    return {
        'title': title,
        'exam_url': exam_url,
        'pdf_link': pdf_link
    }

def main():
    exam_links = get_exam_links()
    print(f'Found {len(exam_links)} exams.')
    exams = []
    for idx, link in enumerate(exam_links):
        print(f'[{idx+1}/{len(exam_links)}] Scraping: {link}')
        try:
            info = extract_exam_info(link)
            exams.append(info)
            time.sleep(1)
        except Exception as e:
            print(f'  Error: {e}')
    # Save to CSV
    with open('zimsake_exams.csv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=['title', 'exam_url', 'pdf_link'])
        writer.writeheader()
        for exam in exams:
            writer.writerow(exam)
    print('Done! Metadata saved to zimsake_exams.csv')

if __name__ == '__main__':
    main()