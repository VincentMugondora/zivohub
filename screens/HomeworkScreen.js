import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Surface, IconButton, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function HomeworkScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const homework = [
    {
      id: 1,
      title: 'Algebra Problem Set',
      subject: 'Mathematics',
      dueDate: '2024-01-15',
      status: 'pending',
      description: 'Complete problems 1-20 in Chapter 3',
      icon: 'math-integral',
      color: '#2196F3',
    },
    {
      id: 2,
      title: 'Essay on Shakespeare',
      subject: 'English',
      dueDate: '2024-01-12',
      status: 'submitted',
      description: 'Write a 1000-word essay on Hamlet',
      icon: 'book-open-page-variant',
      color: '#43A047',
    },
    {
      id: 3,
      title: 'Physics Lab Report',
      subject: 'Physics',
      dueDate: '2024-01-18',
      status: 'overdue',
      description: 'Complete lab report for pendulum experiment',
      icon: 'atom',
      color: '#FF9800',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FF9800';
      case 'submitted': return '#43A047';
      case 'overdue': return '#D32F2F';
      default: return '#7A7A9D';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'submitted': return 'Submitted';
      case 'overdue': return 'Overdue';
      default: return 'Unknown';
    }
  };

  const filteredHomework = selectedFilter === 'all' 
    ? homework 
    : homework.filter(item => item.status === selectedFilter);

  return (
    <View style={styles.container}>
      <Surface style={styles.header}>
        <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle} variant="headlineSmall">Homework</Text>
        <View style={{ width: 48 }} />
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>
          Track your assignments and submissions
        </Text>

        {/* Filter Chips */}
        <View style={styles.filterContainer}>
          <Chip
            selected={selectedFilter === 'all'}
            onPress={() => setSelectedFilter('all')}
            style={styles.filterChip}
          >
            All
          </Chip>
          <Chip
            selected={selectedFilter === 'pending'}
            onPress={() => setSelectedFilter('pending')}
            style={styles.filterChip}
          >
            Pending
          </Chip>
          <Chip
            selected={selectedFilter === 'submitted'}
            onPress={() => setSelectedFilter('submitted')}
            style={styles.filterChip}
          >
            Submitted
          </Chip>
        </View>

        {filteredHomework.map((assignment) => (
          <Card key={assignment.id} style={styles.assignmentCard}>
            <Card.Content style={styles.cardContent}>
              <View style={[styles.iconContainer, { backgroundColor: assignment.color }]}>
                <IconButton
                  icon={assignment.icon}
                  iconColor="white"
                  size={24}
                />
              </View>
              <View style={styles.assignmentInfo}>
                <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                <Text style={styles.assignmentSubject}>{assignment.subject}</Text>
                <Text style={styles.assignmentDescription}>{assignment.description}</Text>
                <View style={styles.assignmentMeta}>
                  <Text style={styles.dueDate}>Due: {assignment.dueDate}</Text>
                  <Chip
                    mode="outlined"
                    textStyle={{ color: getStatusColor(assignment.status) }}
                    style={[styles.statusChip, { borderColor: getStatusColor(assignment.status) }]}
                  >
                    {getStatusText(assignment.status)}
                  </Chip>
                </View>
              </View>
            </Card.Content>
            <Card.Actions>
              {assignment.status === 'pending' && (
                <Button 
                  mode="contained" 
                  onPress={() => navigation.navigate('SubmitHomework', { assignmentId: assignment.id })}
                >
                  Submit
                </Button>
              )}
              <Button 
                mode="outlined" 
                onPress={() => navigation.navigate('AssignmentDetail', { assignmentId: assignment.id })}
              >
                View Details
              </Button>
            </Card.Actions>
          </Card>
        ))}

        <Button
          mode="outlined"
          icon="plus"
          onPress={() => navigation.navigate('CreateAssignment')}
          style={styles.createButton}
        >
          Create New Assignment
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
    marginBottom: 16,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  assignmentCard: {
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
    alignItems: 'flex-start',
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
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222B45',
    marginBottom: 4,
  },
  assignmentSubject: {
    fontSize: 14,
    color: '#7A7A9D',
    marginBottom: 4,
  },
  assignmentDescription: {
    fontSize: 14,
    color: '#7A7A9D',
    marginBottom: 8,
  },
  assignmentMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: 12,
    color: '#7A7A9D',
  },
  statusChip: {
    height: 24,
  },
  createButton: {
    marginTop: 16,
    marginBottom: 24,
  },
}); 