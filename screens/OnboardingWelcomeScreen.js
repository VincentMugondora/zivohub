import React from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingWelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.bg}>
      <View style={styles.statusBarPad} />
      <Surface style={styles.card}>
        <Image source={require('../assets/images/welcome.jpg')} style={styles.illustration} resizeMode="contain" />
        <View style={styles.textBlock}>
          <Text style={styles.headline}>
            The Ultimate{Platform.OS === 'ios' ? '\n' : ' '}Learning App
          </Text>
          <Text style={styles.description}>
            Welcome to LearnHub, the ultimate online course app that empowers you to unlock your potential.\nDive into a world of knowledge and skill.
          </Text>
        </View>
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
          <View style={styles.dot} />
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#F4F2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBarPad: {
    height: 44,
  },
  card: {
    width: 320,
    maxWidth: '92%',
    height: 600,
    borderRadius: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 32,
    paddingHorizontal: 24,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    transform: [{ rotate: '-7deg' }],
  },
  illustration: {
    width: 200,
    height: 160,
    marginBottom: 18,
    borderRadius: 24,
  },
  textBlock: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 32,
  },
  headline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222B45',
    marginBottom: 10,
    lineHeight: 34,
  },
  description: {
    fontSize: 15,
    color: '#7A7A9D',
    lineHeight: 22,
    fontWeight: '400',
    marginBottom: 0,
  },
  button: {
    marginTop: 10,
    marginBottom: 24,
    borderRadius: 24,
    width: 180,
    alignSelf: 'center',
    backgroundColor: '#7C5CFA',
    elevation: 0,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 0.5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0DEEF',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#7C5CFA',
    width: 18,
    borderRadius: 6,
  },
}); 