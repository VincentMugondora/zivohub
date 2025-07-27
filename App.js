import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { ActivityIndicator, View } from 'react-native';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    i18n.on('initialized', () => setReady(true));
    if (i18n.isInitialized) setReady(true);
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PaperProvider>
    </I18nextProvider>
  );
} 