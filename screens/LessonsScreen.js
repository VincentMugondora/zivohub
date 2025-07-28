import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Surface, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function LessonsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const lessons = [
    {
      id: 1,
      title: 'Mathematics - Algebra',
      description: 'Learn basic algebraic concepts and equations',
      progress: 75,
      icon: 'math-integral',
      color: '#2196F3',
    },
    {
      id: 2,
      title: 'English Literature',
      description: 'Explore classic literature and writing skills',
      progress: 45,
      icon: 'book-open-page-variant',
      color: '#43A047',
    },
    {
      id: 3,
      title: 'Physics - Mechanics',
      description: 'Understand motion, forces, and energy',
      progress: 30,
      icon: 'atom',
      color: '#FF9800',
    },
  ];

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle} variant="headlineSmall">My Lessons</Text>
        <View style={{ width: 48 }} />
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>
          Continue your learning journey
        </Text>

        {lessons.map((lesson) => (
          <Card key={lesson.id} style={styles.lessonCard}>
            <Card.Content style={styles.cardContent}>
              <View style={[styles.iconContainer, { backgroundColor: lesson.color }]}>
                <IconButton
                  icon={lesson.icon}
                  iconColor="white"
                  size={24}
                />
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                <View style={styles.progressContainer}>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${lesson.progress}%`, backgroundColor: lesson.color }]} />
                  </View>
                  <Text style={styles.progressText}>{lesson.progress}% Complete</Text>
                </View>
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
          Enroll in New Course
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