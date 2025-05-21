import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import MapSection from "../components/maps/MapSection";
import TaskStepSection from "../components/task/TaskStepSection";

export default function Dashboard() {
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Dashboard Mekanik</Text>
      <Text style={styles.subtext}>🕒 {currentTime}</Text>
      <Text style={styles.subtext}>📅 {currentDate}</Text>

      <MapSection />

      <TaskStepSection />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/logs")}
      >
        <Text style={styles.buttonText}>📒 Lihat Riwayat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.buttonText}>🔒 Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20, paddingTop: 60 },
  title: { fontSize: 24, color: "white", fontWeight: "bold", marginBottom: 8 },
  subtext: { color: "#ccc", marginBottom: 4 },
  button: {
    backgroundColor: "#1FBFB8",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  logoutButton: { backgroundColor: "#c0392b", marginTop: 24 },
  buttonText: { color: "white", fontWeight: "600" },
});
