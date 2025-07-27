import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingWelcomeScreen from '../screens/OnboardingWelcomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TutoringSessionScreen from '../screens/TutoringSessionScreen';
import HomeworkHelpScreen from '../screens/HomeworkHelpScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="OnboardingWelcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcomeScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="TutoringSession" component={TutoringSessionScreen} />
      <Stack.Screen name="HomeworkHelp" component={HomeworkHelpScreen} />
    </Stack.Navigator>
  );
} 