import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Surface, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import supabase from '../supabase/client';

export default function EnrollCourseScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('lessons').insert([
      { title: title.trim(), description: description.trim(), subject: subject.trim() }
    ]);
    setLoading(false);
    if (error) {
      setError(error.message || 'Failed to enroll course.');
    } else {
      setSuccess('Course enrolled successfully!');
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Surface style={styles.card}>
          <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} style={styles.backBtn} />
          <Text style={styles.title}>Enroll in a New Course</Text>
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            autoFocus
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline
          />
          <TextInput
            label="Subject"
            value={subject}
            onChangeText={setSubject}
            style={styles.input}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}
          <Button
            mode="contained"
            style={styles.button}
            loading={loading}
            onPress={handleSubmit}
            disabled={loading || !title.trim()}
          >
            Enroll Course
          </Button>
        </Surface>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F2FF',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    backgroundColor: '#fff',
    padding: 28,
    elevation: 8,
    alignItems: 'center',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
  backBtn: {
    position: 'absolute',
    left: 8,
    top: 8,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#1976D2',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 14,
    backgroundColor: '#F4F2FF',
  },
  button: {
    width: '100%',
    borderRadius: 18,
    marginTop: 8,
    backgroundColor: '#1976D2',
  },
  error: {
    color: '#D32F2F',
    marginBottom: 8,
    textAlign: 'center',
  },
  success: {
    color: '#388E3C',
    marginBottom: 8,
    textAlign: 'center',
  },
}); 