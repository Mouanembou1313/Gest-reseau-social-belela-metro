import React, { useEffect, useRef, useState } from 'react';
import { Animated, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles as s } from './loading.style';

type Props = { onFinish: () => void };
export function LoadingScreen({ onFinish }: Props) {
  const animated = useRef(new Animated.Value(0)).current;
  const finishRef = useRef(onFinish);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    finishRef.current = onFinish;
  }, [onFinish]);
  useEffect(() => {
    const listener = animated.addListener(({ value }) =>
      setProgress(Math.round(value)),
    );
    const animation = Animated.timing(animated, {
      toValue: 100,
      duration: 1800,
      useNativeDriver: false,
    });
    animation.start(({ finished }) => {
      if (finished) finishRef.current();
    });
    return () => {
      animation.stop();
      animated.removeListener(listener);
    };
  }, [animated]);
  const width = animated.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });
  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={s.content}>
        <Text style={s.brand}>Belela</Text>
        <Text style={s.title}>Votre espace vous attend.</Text>
        <Text style={s.subtitle}>Encore un instant...</Text>
        <View
          style={s.track}
          accessibilityRole="progressbar"
          accessibilityLabel="Ouverture de votre espace"
          accessibilityValue={{ min: 0, max: 100, now: progress }}
        >
          <Animated.View style={[s.progress, { width }]} />
        </View>
        <Text style={s.percent}>{progress}%</Text>
      </View>
    </SafeAreaView>
  );
}
