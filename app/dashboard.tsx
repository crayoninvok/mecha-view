import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 Selamat Datang di Dashboard</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/stopwatch')}>
        <Text style={styles.buttonText}>⏱️ Buka Stopwatch</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => router.replace('/login')}>
        <Text style={styles.buttonText}>🔒 Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { color: 'white', fontSize: 22, marginBottom: 40, textAlign: 'center' },
  button: {
    backgroundColor: '#1FBFB8',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
