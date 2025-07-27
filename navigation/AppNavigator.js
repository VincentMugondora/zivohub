import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Placeholder imports for screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TutoringSessionScreen from '../screens/TutoringSessionScreen';
import HomeworkHelpScreen from '../screens/HomeworkHelpScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="TutoringSession" component={TutoringSessionScreen} />
      <Stack.Screen name="HomeworkHelp" component={HomeworkHelpScreen} />
    </Stack.Navigator>
  );
} 