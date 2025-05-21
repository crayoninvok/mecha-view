import { Platform, View, ActivityIndicator, Text, Dimensions, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

let WebMap: any = null;
if (Platform.OS === 'web') {
  WebMap = require('./WebMap').default;
}

export default function MapSection() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'web') {
        setLocation({ lat: -6.2, lng: 106.8 }); // lokasi default web
        setLoading(false);
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.mapLoading}>
        <ActivityIndicator size="large" color="#1FBFB8" />
        <Text style={styles.mapLoadingText}>Memuat lokasi...</Text>
      </View>
    );
  }

  if (!location) {
    return <Text style={styles.mapLoadingText}>Lokasi tidak tersedia</Text>;
  }

  if (Platform.OS === 'web' && WebMap) {
    return <WebMap lat={location.lat} lng={location.lng} />;
  }

  const MapView = require('react-native-maps').default;
  const Marker = require('react-native-maps').Marker;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={{ latitude: location.lat, longitude: location.lng }} title="Posisi Kamu" />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
  mapLoading: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  mapLoadingText: {
    color: '#aaa',
    marginTop: 10,
  },
});
