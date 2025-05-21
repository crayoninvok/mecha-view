import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Logo Perusahaan */}
      <Image
        source={require('../assets/images/bdplogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Mechanics Activity App</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/dashboard')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  logo: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 24, color: 'white', marginBottom: 20 },
  input: { backgroundColor: '#222', color: 'white', padding: 12, borderRadius: 8, marginBottom: 16, width: '100%' },
  button: { backgroundColor: '#1FBFB8', padding: 14, borderRadius: 8, alignItems: 'center', width: '100%' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
