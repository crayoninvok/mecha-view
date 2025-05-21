import { Text, StyleSheet, View } from 'react-native';

interface Props {
  seconds: number;
}

export default function StopwatchDisplay({ seconds }: Props) {
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View>
      <Text style={styles.time}>{formatTime(seconds)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  time: {
    fontSize: 48,
    color: 'white',
    marginBottom: 40,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    textAlign: 'center',
  },
});
