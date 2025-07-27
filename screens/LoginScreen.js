import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const role = route.params?.role || 'none';

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Login Screen</Text>
      <Text>Selected role: {role}</Text>
      <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>
        Back
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  button: {
    marginTop: 24,
  },
}); 