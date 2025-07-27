import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Surface, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import supabase from '../supabase/client';

export default function SignupScreen() {
  const navigation = useNavigation();
  const [signupMethod, setSignupMethod] = useState('phone'); // 'phone' or 'email'
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async () => {
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    let params = {
      password,
      options: { data: { name } },
    };
    if (signupMethod === 'phone') {
      params.phone = phone;
    } else {
      params.email = email;
    }
    const { error } = await supabase.auth.signUp(params);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Signup successful! Check your ' + (signupMethod === 'phone' ? 'SMS' : 'email') + ' to confirm your account.');
      setTimeout(() => navigation.navigate('Dashboard'), 1200);
    }
  };

  return (
    <View style={styles.bg}>
      <Surface style={styles.card}>
        <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} style={styles.backBtn} />
        <Text style={styles.headline} variant="headlineMedium">Sign Up for ZivoHub</Text>
        <Text style={styles.subtext}>Create your account to get started</Text>
        <View style={styles.toggleRow}>
          <Button
            mode={signupMethod === 'phone' ? 'contained' : 'outlined'}
            onPress={() => setSignupMethod('phone')}
            style={styles.toggleBtn}
          >
            Phone
          </Button>
          <Button
            mode={signupMethod === 'email' ? 'contained' : 'outlined'}
            onPress={() => setSignupMethod('email')}
            style={styles.toggleBtn}
          >
            Email
          </Button>
        </View>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        {signupMethod === 'phone' ? (
          <TextInput
            label="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />
        ) : (
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
        )}
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)} />}
          style={styles.input}
        />
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {success ? <Text style={styles.success}>{success}</Text> : null}
        <Button
          mode="contained"
          style={styles.button}
          loading={loading}
          onPress={handleSignup}
          disabled={
            loading ||
            !name ||
            !password ||
            !confirmPassword ||
            (signupMethod === 'phone' ? !phone : !email)
          }
        >
          Sign Up
        </Button>
        <View style={styles.signupRow}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupLink}>Login</Text>
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
  success: {
    color: '#388E3C',
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