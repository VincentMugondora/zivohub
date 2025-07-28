import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Surface, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import supabase from '../supabase/client';

export default function EmailConfirmationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const { email, phone, signupMethod } = route.params || {};

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    setResendLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      
      if (error) {
        console.error('Resend error:', error);
      } else {
        setCountdown(60); // 60 second cooldown
      }
    } catch (err) {
      console.error('Resend error:', err);
    } finally {
      setResendLoading(false);
    }
  };

  const handleCheckConfirmation = async () => {
    setLoading(true);
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (user && user.email_confirmed_at) {
        // User is confirmed, navigate to dashboard
        navigation.replace('MainTabs');
      } else {
        // Still not confirmed
        setLoading(false);
      }
    } catch (err) {
      console.error('Check confirmation error:', err);
      setLoading(false);
    }
  };

  const getContactInfo = () => {
    if (signupMethod === 'phone') {
      return phone;
    }
    return email;
  };

  const getContactType = () => {
    return signupMethod === 'phone' ? 'SMS' : 'email';
  };

  const getTitleKey = () => {
    return signupMethod === 'phone' ? 'check_sms' : 'check_email';
  };

  const getConfirmedButtonKey = () => {
    return signupMethod === 'phone' ? 'confirmed_sms' : 'confirmed_email';
  };

  const getResendButtonKey = () => {
    return signupMethod === 'phone' ? 'resend_sms' : 'resend_email';
  };

  const getFooterKey = () => {
    return signupMethod === 'phone' ? 'sms_footer' : 'email_footer';
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.card}>
        <IconButton 
          icon="arrow-left" 
          size={24} 
          onPress={() => navigation.goBack()} 
          style={styles.backBtn} 
        />
        
        <View style={styles.iconContainer}>
          <IconButton
            icon="email-check"
            size={48}
            iconColor="#7C5CFA"
            style={styles.emailIcon}
          />
        </View>

        <Text style={styles.title}>{t(getTitleKey())}</Text>
        <Text style={styles.subtitle}>
          {t('confirmation_sent')}
        </Text>
        <Text style={styles.email}>{getContactInfo()}</Text>

        <View style={styles.instructions}>
          <Text style={styles.instructionText}>
            {signupMethod === 'phone' ? t('sms_instructions') : t('email_instructions')}
          </Text>
          <Text style={styles.instructionText}>
            {t('spam_check')}
          </Text>
          <Text style={styles.instructionText}>
            {t('link_expiry')}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            style={styles.primaryButton}
            loading={loading}
            onPress={handleCheckConfirmation}
          >
            {t(getConfirmedButtonKey())}
          </Button>

          <Button
            mode="outlined"
            style={styles.resendButton}
            loading={resendLoading}
            onPress={handleResendEmail}
            disabled={countdown > 0 || resendLoading}
          >
            {countdown > 0 
              ? t('resend_countdown', { seconds: countdown })
              : t(getResendButtonKey())
            }
          </Button>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {t(getFooterKey())}
          </Text>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F2FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 28,
    backgroundColor: '#fff',
    padding: 32,
    elevation: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
  },
  backBtn: {
    position: 'absolute',
    left: 8,
    top: 8,
    zIndex: 10,
  },
  iconContainer: {
    marginBottom: 24,
  },
  emailIcon: {
    backgroundColor: '#F4F2FF',
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222B45',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#7A7A9D',
    textAlign: 'center',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7C5CFA',
    textAlign: 'center',
    marginBottom: 24,
  },
  instructions: {
    marginBottom: 32,
    width: '100%',
  },
  instructionText: {
    fontSize: 14,
    color: '#7A7A9D',
    marginBottom: 8,
    textAlign: 'left',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 24,
  },
  primaryButton: {
    marginBottom: 12,
    borderRadius: 18,
    backgroundColor: '#7C5CFA',
  },
  resendButton: {
    borderRadius: 18,
    borderColor: '#7C5CFA',
  },
  footer: {
    width: '100%',
  },
  footerText: {
    fontSize: 12,
    color: '#7A7A9D',
    textAlign: 'center',
    lineHeight: 18,
  },
}); 