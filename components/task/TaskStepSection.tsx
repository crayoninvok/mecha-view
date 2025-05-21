import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = {
  id: string;
  title: string;
  duration: number;
  started: boolean;
  finished: boolean;
};

const TASKS_KEY = 'today_tasks';
const LOGS_KEY = 'task_logs';

export default function TaskStepSection() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const defaultTasks: Task[] = [
    { id: '1', title: 'Cek oli alat berat #12', duration: 0, started: false, finished: false },
    { id: '2', title: 'Ganti ban unit dump truck #7', duration: 0, started: false, finished: false },
    { id: '3', title: 'Inspeksi filter udara', duration: 0, started: false, finished: false },
  ];

  useEffect(() => {
    const loadTasks = async () => {
      const saved = await AsyncStorage.getItem(TASKS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setTasks(parsed);
        const nextIndex = parsed.findIndex((t: Task) => !t.finished);
        setCurrentTaskIndex(nextIndex === -1 ? parsed.length : nextIndex);
      } else {
        setTasks(defaultTasks);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (tasks[currentTaskIndex]?.started && !tasks[currentTaskIndex]?.finished) {
      const id = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [tasks[currentTaskIndex]?.started]);

  const startTask = () => {
    setTasks((prev) =>
      prev.map((task, index) =>
        index === currentTaskIndex ? { ...task, started: true } : task
      )
    );
  };

  const finishTask = () => {
    if (intervalId) clearInterval(intervalId);
    setTasks((prev) =>
      prev.map((task, index) =>
        index === currentTaskIndex
          ? { ...task, finished: true, duration: timer }
          : task
      )
    );
    setTimer(0);
    setCurrentTaskIndex((prev) => prev + 1);
  };

  const resetTasks = () => {
    Alert.alert('Reset Semua Tugas', 'Yakin ingin reset semua progress tugas?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          if (intervalId) clearInterval(intervalId);
          await AsyncStorage.removeItem(TASKS_KEY);
          setTasks(defaultTasks);
          setCurrentTaskIndex(0);
          setTimer(0);
        },
      },
    ]);
  };

  const saveLog = async () => {
    const now = new Date();
    const log = {
      date: now.toLocaleString('id-ID'),
      tasks,
      totalDuration,
    };

    const existing = await AsyncStorage.getItem(LOGS_KEY);
    const parsed = existing ? JSON.parse(existing) : [];
    parsed.push(log);
    await AsyncStorage.setItem(LOGS_KEY, JSON.stringify(parsed));

    Alert.alert('✅ Log Disimpan', 'Riwayat tugas berhasil disimpan.');
  };

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const allFinished = tasks.length > 0 && tasks.every((task) => task.finished);
  const totalDuration = tasks.reduce((sum, t) => sum + t.duration, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tugas Hari Ini</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>
              {index + 1}. {item.title}
            </Text>
            {item.finished && (
              <Text style={styles.duration}>Durasi: {formatTime(item.duration)}</Text>
            )}
            {index === currentTaskIndex && !item.finished && (
              <>
                <Text style={styles.duration}>⏱️ {formatTime(timer)}</Text>
                {!item.started ? (
                  <TouchableOpacity style={styles.startBtn} onPress={startTask}>
                    <Text style={styles.btnText}>Mulai</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.finishBtn} onPress={finishTask}>
                    <Text style={styles.btnText}>Selesai</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        )}
        style={{ width: '100%' }}
      />

      {allFinished && (
        <View style={styles.footerBox}>
          <Text style={styles.totalText}>Total Waktu: {formatTime(totalDuration)}</Text>
          <TouchableOpacity style={styles.saveBtn} onPress={saveLog}>
            <Text style={styles.btnText}>💾 Simpan Log</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.resetBtn} onPress={resetTasks}>
        <Text style={styles.btnText}>🔄 Reset Semua Tugas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 30, gap: 12 },
  title: { color: '#1FBFB8', fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  taskItem: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  taskText: { color: 'white', fontWeight: '600', marginBottom: 4 },
  duration: { color: '#ccc', marginBottom: 8 },
  startBtn: {
    backgroundColor: '#1FBFB8',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  finishBtn: {
    backgroundColor: '#f39c12',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '600' },
  footerBox: {
    marginTop: 20,
    backgroundColor: '#1e272e',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    gap: 12,
  },
  totalText: { color: '#1FBFB8', fontSize: 16, fontWeight: 'bold' },
  saveBtn: {
    backgroundColor: '#1FBFB8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  resetBtn: {
    backgroundColor: '#c0392b',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
});
