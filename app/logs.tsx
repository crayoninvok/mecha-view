import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

type LogEntry = {
  date: string;
  totalDuration: number;
  tasks: {
    id: string;
    title: string;
    duration: number;
  }[];
};

export default function LogHistory() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadLogs = async () => {
      const data = await AsyncStorage.getItem('task_logs');
      if (data) {
        setLogs(JSON.parse(data));
      }
    };
    loadLogs();
  }, []);

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📒 Riwayat Tugas</Text>

      {logs.length === 0 ? (
        <Text style={styles.emptyText}>Belum ada log tersimpan.</Text>
      ) : (
        logs
          .slice()
          .reverse()
          .map((log, index) => (
            <View key={index} style={styles.logBox}>
              <Text style={styles.logDate}>🗓️ {log.date}</Text>
              {log.tasks.map((task) => (
                <Text key={task.id} style={styles.taskLine}>
                  ✅ {task.title} — {formatTime(task.duration)}
                </Text>
              ))}
              <Text style={styles.totalText}>⏱️ Total: {formatTime(log.totalDuration)}</Text>
            </View>
          ))
      )}

      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.btnText}>⬅️ Kembali</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#111', minHeight: '100%' },
  title: { fontSize: 22, color: '#1FBFB8', fontWeight: 'bold', marginBottom: 16 },
  logBox: {
    backgroundColor: '#222',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  logDate: { color: '#ccc', marginBottom: 6, fontWeight: '600' },
  taskLine: { color: 'white', fontSize: 14, marginBottom: 4 },
  totalText: { color: '#1FBFB8', marginTop: 10, fontWeight: 'bold' },
  emptyText: { color: '#aaa', marginTop: 30 },
  backBtn: {
    backgroundColor: '#1FBFB8',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 30,
  },
  btnText: { color: 'white', fontWeight: '600' },
});
