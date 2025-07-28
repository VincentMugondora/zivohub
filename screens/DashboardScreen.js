import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, NetInfo } from 'react-native';
import { Text, Card, Button, Surface, IconButton, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../components/LanguageToggle';
import supabase from '../supabase/client';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // Simple online/offline detection for web
    if (typeof navigator !== 'undefined' && navigator.onLine !== undefined) {
      const handleOnlineStatus = () => setIsOnline(navigator.onLine);
      window.addEventListener('online', handleOnlineStatus);
      window.addEventListener('offline', handleOnlineStatus);
      return () => {
        window.removeEventListener('online', handleOnlineStatus);
        window.removeEventListener('offline', handleOnlineStatus);
      };
    }
  }, []);

  const dashboardCards = [
    {
      id: 'lessons',
      title: t('my_lessons'),
      description: 'Access your enrolled courses and learning materials',
      icon: 'book-open-variant',
      color: '#2196F3',
      onPress: () => navigation.navigate('Lessons'),
    },
    {
      id: 'help',
      title: t('ask_for_help'),
      description: 'Get instant help from tutors and peers',
      icon: 'help-circle',
      color: '#43A047',
      onPress: () => navigation.navigate('HomeworkHelp'),
    },
    {
      id: 'homework',
      title: t('homework'),
      description: 'Submit assignments and track your progress',
      icon: 'clipboard-text',
      color: '#FF9800',
      onPress: () => navigation.navigate('Homework'),
    },
    {
      id: 'tutoring',
      title: t('tutoring_session'),
      description: 'Join live tutoring sessions',
      icon: 'video',
      color: '#9C27B0',
      onPress: () => navigation.navigate('TutoringSession'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <Surface style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.userInfo}>
            <Avatar.Text 
              size={40} 
              label={user?.email?.charAt(0).toUpperCase() || 'U'} 
              style={styles.avatar}
            />
            <View style={styles.userText}>
              <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail" adjustsFontSizeToFit minimumFontScale={0.7}>
                {user?.user_metadata?.name || user?.email || 'User'}
              </Text>
              <Text style={styles.userRole} numberOfLines={1} ellipsizeMode="tail">
                Student
              </Text>
            </View>
          </View>
          <LanguageToggle />
        </View>
        
        {/* Offline Indicator */}
        {!isOnline && (
          <View style={styles.offlineBanner}>
            <Text style={styles.offlineText}>{t('offline')}</Text>
          </View>
        )}
      </Surface>

      {/* Dashboard Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>
          Welcome back! What would you like to learn today?
        </Text>

        {/* Dashboard Cards */}
        <View style={styles.cardsContainer}>
          {dashboardCards.map((card) => (
            <Card key={card.id} style={styles.card} onPress={card.onPress}>
              <Card.Content style={styles.cardContent}>
                <View style={[styles.iconContainer, { backgroundColor: card.color }]}>
                  <IconButton
                    icon={card.icon}
                    iconColor="white"
                    size={24}
                  />
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                  <Text style={styles.cardDescription}>{card.description}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <Button
              mode="outlined"
              icon="calendar"
              onPress={() => navigation.navigate('Schedule')}
              style={styles.actionButton}
            >
              Schedule Session
            </Button>
            <Button
              mode="outlined"
              icon="message"
              onPress={() => navigation.navigate('Messages')}
              style={styles.actionButton}
            >
              Messages
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1976D2',
  },
  header: {
    backgroundColor: '#1565C0',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    elevation: 8,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#43A047',
  },
  userText: {
    marginLeft: 12,
    flexShrink: 1,
    minWidth: 0,
    maxWidth: 180,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    maxWidth: 180,
    flexShrink: 1,
  },
  userRole: {
    fontSize: 14,
    color: '#B3E5FC',
  },
  offlineBanner: {
    backgroundColor: '#FF9800',
    padding: 8,
    borderRadius: 8,
    marginTop: 12,
    alignSelf: 'stretch',
  },
  offlineText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
    textShadowColor: '#1565C0',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardsContainer: {
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    elevation: 8,
    backgroundColor: '#fff',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
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
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#388E3C',
    lineHeight: 20,
  },
  quickActions: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 6,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#43A047',
    borderRadius: 16,
    borderWidth: 0,
    color: '#fff',
  },
}); 