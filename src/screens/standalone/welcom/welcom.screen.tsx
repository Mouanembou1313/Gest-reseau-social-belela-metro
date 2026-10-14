import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthStackParamList } from '../../../navigations/auth.navigation';
import { styles as s } from './welcom.style';

export function WelcomeScreen() {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  return (
    <ImageBackground
      source={require('../../../assets/images/9.jpg')}
      style={s.screen}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <View style={s.overlay}>
        <SafeAreaView style={s.safe} edges={['top', 'left', 'right']}>
          <ScrollView
            contentContainerStyle={s.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={s.hero}>
              <Text style={s.eyebrow}>Bienvenue dans votre communauté</Text>
              <Text style={s.title}>Belela</Text>
              <Text style={s.subtitle}>
                Vos moments.{'\n'}Vos proches. Votre monde.
              </Text>
            </View>
            <SafeAreaView style={s.actions} edges={['bottom']}>
              <View style={s.actionContent}>
                <Text style={s.actionTitle}>
                  Les belles histoires commencent ici.
                </Text>
                <TouchableOpacity
                  style={s.primary}
                  activeOpacity={0.85}
                  onPress={() => navigation.navigate('signin')}
                  accessibilityRole="button"
                >
                  <Text style={s.primaryText}>Se connecter</Text>
                  <MaterialIcons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={s.secondary}
                  activeOpacity={0.85}
                  onPress={() => navigation.navigate('signup')}
                  accessibilityRole="button"
                >
                  <MaterialIcons
                    name="person-add-alt-1"
                    size={20}
                    color="#3b5bdb"
                  />
                  <Text style={s.secondaryText}>Créer un compte</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </ScrollView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
