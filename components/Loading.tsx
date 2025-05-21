import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

export default function Loading() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Ring 1 */}
      <Animated.View
        style={[
          styles.ring,
          {
            borderTopColor: '#e85c23',
            transform: [{ rotate: rotation }],
          },
        ]}
      />

      {/* Ring 2 (delay visual) */}
      <Animated.View
        style={[
          styles.ring,
          {
            borderBottomColor: '#1fbfb8',
            position: 'absolute',
            borderTopColor: 'transparent',
            transform: [{ rotate: rotation }],
          },
        ]}
      />

      {/* Logo */}
      <Image
        source={require('../assets/images/bdplogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    width: 64,
    height: 64,
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 32,
    position: 'absolute',
  },
  logo: {
    width: 32,
    height: 32,
    zIndex: 10,
  },
});
