import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Divider, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en', label: 'english' },
  { code: 'sn', label: 'shona' },
  { code: 'nd', label: 'ndebele' },
];

export default function LanguageToggle() {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const currentLang = i18n.language in ['en', 'sn', 'nd'] ? i18n.language : 'en';

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button mode="outlined" onPress={openMenu}>{t(LANGUAGES.find(l => l.code === currentLang).label)}</Button>}
      >
        {LANGUAGES.map(lang => (
          <Menu.Item
            key={lang.code}
            onPress={() => {
              i18n.changeLanguage(lang.code);
              closeMenu();
            }}
            title={t(lang.label)}
            disabled={currentLang === lang.code}
          />
        ))}
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    margin: 8,
  },
}); 