import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleRole = (role) => {
    navigation.navigate('Login', { role });
  };

  return (
    <View style={styles.container}>
      <View style={styles.languageToggle}>
        <LanguageToggle />
      </View>
      <Surface style={styles.surface}>
        <Text style={styles.title} variant="headlineLarge">{t('welcome')}</Text>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => handleRole('student')}
          buttonColor="#2196F3"
          textColor="#fff"
        >
          {t('student')}
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => handleRole('tutor')}
          buttonColor="#43A047"
          textColor="#fff"
        >
          {t('tutor')}
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => handleRole('admin')}
          buttonColor="#1976D2"
          textColor="#fff"
        >
          {t('admin')}
        </Button>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(180deg, #E3F2FD 0%, #E8F5E9 100%)', // fallback to light blue/green
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageToggle: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 10,
  },
  surface: {
    padding: 32,
    borderRadius: 24,
    elevation: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '85%',
  },
  title: {
    marginBottom: 32,
    color: '#1976D2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginVertical: 8,
    borderRadius: 16,
    width: 220,
  },
}); 