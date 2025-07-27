import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';
import { useNavigation } from '@react-navigation/native';
// If you have a logo, place it in assets/images/logo.png
// import logo from '../assets/images/logo.png';

// Try to use LinearGradient if available
let LinearGradient;
try {
  LinearGradient = require('expo-linear-gradient').LinearGradient;
} catch {
  LinearGradient = View;
}

export default function WelcomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleRole = (role) => {
    navigation.navigate('Login', { role });
  };

  return (
    <LinearGradient
      colors={["#2196F3", "#43A047"]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.languageToggle}>
        <LanguageToggle />
      </View>
      <Surface style={styles.surface}>
        {/* <Image source={logo} style={styles.logo} /> */}
        <Text style={styles.title} variant="headlineLarge">{t('welcome')}</Text>
        <Text style={styles.subtitle} variant="titleMedium">
          Empowering Zimbabwean learners and tutors
        </Text>
        <Button
          mode="contained"
          style={[styles.button, { backgroundColor: '#2196F3' }]}
          onPress={() => handleRole('student')}
          labelStyle={styles.buttonLabel}
        >
          {t('student')}
        </Button>
        <Button
          mode="contained"
          style={[styles.button, { backgroundColor: '#43A047' }]}
          onPress={() => handleRole('tutor')}
          labelStyle={styles.buttonLabel}
        >
          {t('tutor')}
        </Button>
        <Button
          mode="contained"
          style={[styles.button, { backgroundColor: '#1976D2' }]}
          onPress={() => handleRole('admin')}
          labelStyle={styles.buttonLabel}
        >
          {t('admin')}
        </Button>
      </Surface>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
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
    padding: 36,
    borderRadius: 32,
    elevation: 8,
    backgroundColor: 'rgba(255,255,255,0.97)',
    alignItems: 'center',
    width: '88%',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
  },
  // logo: {
  //   width: 90,
  //   height: 90,
  //   marginBottom: 18,
  //   borderRadius: 24,
  // },
  title: {
    marginBottom: 12,
    color: '#1976D2',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 32,
  },
  subtitle: {
    marginBottom: 32,
    color: '#388E3C',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    marginVertical: 10,
    borderRadius: 20,
    width: 220,
    elevation: 2,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
}); 