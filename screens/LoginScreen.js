import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Surface, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import supabase from '../supabase/client';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' or 'email'
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      let params = { password };
      
      if (loginMethod === 'phone') {
        if (!phone.trim()) {
          setError('Please enter a phone number');
          setLoading(false);
          return;
        }
        params.phone = phone.trim();
      } else {
        if (!email.trim()) {
          setError('Please enter an email address');
          setLoading(false);
          return;
        }
        params.email = email.trim();
      }

      if (!password.trim()) {
        setError('Please enter a password');
        setLoading(false);
        return;
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword(params);
      
      if (authError) {
        console.error('Auth error:', authError);
        setError(authError.message || 'Login failed. Please check your credentials.');
      } else if (data?.user) {
        console.log('Login successful:', data.user);
        // Navigate to dashboard or main app
        navigation.navigate('MainTabs');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.bg}>
      <Surface style={styles.card}>
        <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} style={styles.backBtn} />
        <Text style={styles.headline} variant="headlineMedium">Login to ZivoHub</Text>
        <Text style={styles.subtext}>Enter your {loginMethod === 'phone' ? 'phone number' : 'email'} and password to continue</Text>
        <View style={styles.toggleRow}>
          <Button
            mode={loginMethod === 'phone' ? 'contained' : 'outlined'}
            onPress={() => setLoginMethod('phone')}
            style={styles.toggleBtn}
          >
            Phone
          </Button>
          <Button
            mode={loginMethod === 'email' ? 'contained' : 'outlined'}
            onPress={() => setLoginMethod('email')}
            style={styles.toggleBtn}
          >
            Email
          </Button>
        </View>
        {loginMethod === 'phone' ? (
          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
            placeholder="+263 7X XXX XXXX"
          />
        ) : (
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            placeholder="your.email@example.com"
          />
        )}
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
          style={styles.input}
          placeholder="Enter your password"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button
          mode="contained"
          style={styles.button}
          loading={loading}
          onPress={handleLogin}
          disabled={
            loading ||
            !password.trim() ||
            (loginMethod === 'phone' ? !phone.trim() : !email.trim())
          }
        >
          Login
        </Button>
        <View style={styles.signupRow}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#F4F2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 340,
    maxWidth: '95%',
    borderRadius: 28,
    backgroundColor: '#fff',
    padding: 28,
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
  headline: {
    marginTop: 8,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#222B45',
    textAlign: 'center',
  },
  subtext: {
    color: '#7A7A9D',
    marginBottom: 18,
    textAlign: 'center',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  toggleBtn: {
    marginHorizontal: 6,
    borderRadius: 16,
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
    marginBottom: 12,
    backgroundColor: '#7C5CFA',
  },
  error: {
    color: '#D32F2F',
    marginBottom: 8,
    textAlign: 'center',
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  signupLink: {
    color: '#7C5CFA',
    fontWeight: 'bold',
  },
}); 