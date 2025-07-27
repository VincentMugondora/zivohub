import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function TutoringSessionScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Tutoring Session Screen</Text>
      <Button mode="outlined" onPress={() => navigation.navigate('Welcome')} style={styles.button}>
        Back to Welcome
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