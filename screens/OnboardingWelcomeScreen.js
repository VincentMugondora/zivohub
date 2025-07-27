import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingWelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Surface style={styles.surface}>
        <Image source={require('../assets/images/welcome.jpg')} style={styles.illustration} resizeMode="contain" />
        <Text style={styles.title} variant="headlineLarge">Welcome to ZivoHub</Text>
        <Text style={styles.description} variant="bodyLarge">
          Your gateway to digital learning and tutoring in Zimbabwe.
        </Text>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate('Welcome')}
        >
          Get Started
        </Button>
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surface: {
    padding: 32,
    borderRadius: 32,
    elevation: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '90%',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
  illustration: {
    width: 220,
    height: 180,
    marginBottom: 18,
    borderRadius: 24,
  },
  title: {
    marginBottom: 10,
    color: '#222B45',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
  },
  description: {
    marginBottom: 32,
    color: '#4F5D75',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    marginVertical: 10,
    borderRadius: 20,
    width: 200,
    elevation: 2,
    backgroundColor: '#6C63FF',
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#6C63FF',
  },
}); 