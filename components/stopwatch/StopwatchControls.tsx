import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export default function StopwatchControls({ isRunning, onStart, onStop, onReset }: Props) {
  return (
    <View>
      {isRunning ? (
        <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={onStop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={onStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={onReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1FBFB8',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  stopButton: {
    backgroundColor: '#e67e22',
  },
  resetButton: {
    backgroundColor: '#c0392b',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
