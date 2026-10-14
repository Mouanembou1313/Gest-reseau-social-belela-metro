import React, { useRef, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles as s } from './onboarding.style';

const slides = [
  {
    title: 'Bienvenue sur Belela',
    description: 'Votre place, vos liens, votre communauté.',
    icon: 'people-outline',
  },
  {
    title: 'Des moments à partager',
    description: 'Les petits instants font les plus belles histoires.',
    icon: 'photo-library',
  },
  {
    title: 'Plus proches, simplement',
    description: 'Retrouvez les personnes qui comptent pour vous.',
    icon: 'favorite-border',
  },
];
type Props = { onFinish: () => void };
export function OnboardingScreen({ onFinish }: Props) {
  const [index, setIndex] = useState(0);
  const finished = useRef(false);
  const slide = slides[index];
  const last = index === slides.length - 1;
  function finish() {
    if (!finished.current) {
      finished.current = true;
      onFinish();
    }
  }
  function next() {
    if (last) finish();
    else setIndex(value => Math.min(value + 1, slides.length - 1));
  }
  return (
    <SafeAreaView style={s.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={s.header}>
        <Text style={s.brand}>Belela</Text>
        <TouchableOpacity
          style={s.skip}
          onPress={finish}
          accessibilityRole="button"
        >
          <Text style={s.skipText}>Passer</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={s.content}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require('../../../assets/images/9.jpg')}
          style={s.image}
          resizeMode="cover"
        >
          <View style={s.imageOverlay} />
          <MaterialIcons name={slide.icon} size={72} color="#fff" />
        </ImageBackground>
        <View style={s.copy}>
          <Text style={s.step}>
            {index + 1} / {slides.length}
          </Text>
          <Text style={s.title}>{slide.title}</Text>
          <Text style={s.description}>{slide.description}</Text>
        </View>
      </ScrollView>
      <View style={s.dots}>
        {slides.map((item, i) => (
          <TouchableOpacity
            key={item.title}
            style={s.dotButton}
            onPress={() => setIndex(i)}
            accessibilityRole="button"
            accessibilityLabel={'Étape ' + (i + 1)}
            accessibilityState={{ selected: i === index }}
          >
            <View style={[s.dot, i === index && s.activeDot]} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={s.footer}>
        <TouchableOpacity
          style={s.button}
          onPress={next}
          accessibilityRole="button"
        >
          <Text style={s.buttonText}>{last ? 'Commencer' : 'Continuer'}</Text>
          <MaterialIcons
            name={last ? 'check' : 'arrow-forward'}
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
