import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import OnboardingWelcomeScreen from '../screens/OnboardingWelcomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import EmailConfirmationScreen from '../screens/EmailConfirmationScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LessonsScreen from '../screens/LessonsScreen';
import HomeworkScreen from '../screens/HomeworkScreen';
import TutoringSessionScreen from '../screens/TutoringSessionScreen';
import HomeworkHelpScreen from '../screens/HomeworkHelpScreen';
import EnrollCourseScreen from '../screens/EnrollCourseScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1976D2',
        tabBarInactiveTintColor: '#7A7A9D',
        tabBarStyle: { backgroundColor: '#fff', borderTopWidth: 0, elevation: 8 },
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = 'view-dashboard';
          else if (route.name === 'Lessons') iconName = 'book-open-variant';
          else if (route.name === 'Homework') iconName = 'clipboard-text';
          else if (route.name === 'HomeworkHelp') iconName = 'help-circle';
          else iconName = 'circle';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Lessons" component={LessonsScreen} options={{ tabBarLabel: 'Lessons' }} />
      <Tab.Screen name="Homework" component={HomeworkScreen} options={{ tabBarLabel: 'Homework' }} />
      <Tab.Screen name="HomeworkHelp" component={HomeworkHelpScreen} options={{ tabBarLabel: 'Help' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="OnboardingWelcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcomeScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="EmailConfirmation" component={EmailConfirmationScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="EnrollCourse" component={EnrollCourseScreen} />
      <Stack.Screen name="TutoringSession" component={TutoringSessionScreen} />
    </Stack.Navigator>
  );
} 