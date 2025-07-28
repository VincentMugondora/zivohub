import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card, Button, Surface, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import supabase from '../supabase/client';

export default function LessonsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLessons = async () => {
      setLoading(true);
      setError('');
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        setError('Failed to load lessons.');
        setLessons([]);
      } else {
        setLessons(data || []);
      }
      setLoading(false);
    };
    fetchLessons();
  }, []);

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle} variant="headlineSmall">My Lessons</Text>
        <View style={{ width: 48 }} />
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>
          {t('continue_learning')}
        </Text>

        {loading && (
          <ActivityIndicator size="large" color="#1976D2" style={{ marginVertical: 32 }} />
        )}
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null}
        {!loading && !error && lessons.length === 0 && (
          <Text style={styles.empty}>No lessons found.</Text>
        )}
        {lessons.map((lesson) => (
          <Card key={lesson.id} style={styles.lessonCard}>
            <Card.Content style={styles.cardContent}>
              <View style={[styles.iconContainer, { backgroundColor: '#1976D2' }]}> {/* You can use lesson.subject for color/icon */}
                <IconButton
                  icon="book-open-page-variant"
                  iconColor="white"
                  size={24}
                />
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                {lesson.subject ? (
                  <Text style={styles.lessonSubject}>{lesson.subject}</Text>
                ) : null}
                {lesson.start_time ? (
                  <Text style={styles.lessonMeta}>Start: {lesson.start_time?.slice(0, 16).replace('T', ' ')}</Text>
                ) : null}
              </View>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={() => navigation.navigate('LessonDetail', { lessonId: lesson.id })}>
                Continue
              </Button>
            </Card.Actions>
          </Card>
        ))}

        <Button
          mode="outlined"
          icon="plus"
          onPress={() => navigation.navigate('EnrollCourse')}
          style={styles.enrollButton}
        >
          {t('enroll_course')}
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#222B45',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222B45',
    marginBottom: 24,
    textAlign: 'center',
  },
  error: {
    color: '#D32F2F',
    textAlign: 'center',
    marginVertical: 16,
  },
  empty: {
    color: '#7A7A9D',
    textAlign: 'center',
    marginVertical: 16,
  },
  lessonCard: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222B45',
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#7A7A9D',
    marginBottom: 8,
  },
  lessonSubject: {
    fontSize: 13,
    color: '#1976D2',
    marginBottom: 4,
  },
  lessonMeta: {
    fontSize: 12,
    color: '#7A7A9D',
    marginBottom: 2,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#7A7A9D',
  },
  enrollButton: {
    marginTop: 16,
    marginBottom: 24,
  },
}); 