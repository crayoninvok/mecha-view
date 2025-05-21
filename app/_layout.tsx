import { Stack } from 'expo-router';
import { Platform } from 'react-native';

// ⬇️ Tambahkan baris ini
if (Platform.OS === 'web') {
  require('leaflet/dist/leaflet.css');
}

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
