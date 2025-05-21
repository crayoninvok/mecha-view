import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import StopwatchDisplay from '../components/stopwatch/StopwatchDisplay';
import StopwatchControls from '../components/stopwatch/StopwatchControls';

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <View style={styles.container}>
      <StopwatchDisplay seconds={seconds} />
      <StopwatchControls
        isRunning={isRunning}
        onStart={() => setIsRunning(true)}
        onStop={() => setIsRunning(false)}
        onReset={() => {
          setIsRunning(false);
          setSeconds(0);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' },
});
