import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getCurrentUser } from '../../../services/auth.service';
import { AccountUser } from '../../../services/social.service';
import { useLogout } from '../../../navigations/useLogout';
import { SocialAvatar } from '../../../screens/menu/home/components/socialAvatar.component';
import { styles as s } from './menudrawer.style';

type Props = { visible: boolean; onClose: () => void };
const links = [
  { screen: 'home', label: 'Accueil', icon: 'home' },
  { screen: 'search', label: 'Rechercher des amis', icon: 'search' },
  {
    screen: 'notification',
    label: 'Notifications',
    icon: 'notifications-none',
  },
  { screen: 'account', label: 'Mon compte', icon: 'person-outline' },
];
export function MenuDrawer({ visible, onClose }: Props) {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { width } = useWindowDimensions();
  const drawerWidth = Math.min(width * 0.86, 360);
  const slide = useRef(new Animated.Value(drawerWidth)).current;
  const [user, setUser] = useState<AccountUser | null>(null);
  const { logout, busy, error } = useLogout();
  useEffect(() => {
    let alive = true;
    if (visible) {
      slide.setValue(drawerWidth);
      Animated.timing(slide, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start();
      getCurrentUser()
        .then(profile => {
          if (alive) setUser(profile);
        })
        .catch(() => {});
    }
    return () => {
      alive = false;
      slide.stopAnimation();
    };
  }, [visible, drawerWidth, slide]);
  function goTo(screen: string) {
    onClose();
    navigation.navigate('main', { screen });
  }
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={() => {
        if (!busy) onClose();
      }}
    >
      <View style={s.overlay}>
        <Pressable
          style={s.backdrop}
          onPress={onClose}
          accessibilityLabel="Fermer le menu"
        />
        <Animated.View
          style={[
            s.drawer,
            { width: drawerWidth, transform: [{ translateX: slide }] },
          ]}
        >
          <SafeAreaView style={s.safe} edges={['top', 'right', 'bottom']}>
            <ScrollView contentContainerStyle={s.content}>
              <View style={s.heading}>
                <Text style={s.brand}>Belela</Text>
                <TouchableOpacity
                  style={s.close}
                  onPress={onClose}
                  accessibilityLabel="Fermer"
                >
                  <MaterialIcons name="close" size={24} color="#526176" />
                </TouchableOpacity>
              </View>
              <View style={s.profile}>
                <SocialAvatar
                  name={user?.username}
                  uri={user?.profilePic}
                  size={64}
                />
                <Text style={s.name} numberOfLines={2}>
                  {user?.username || 'Votre compte'}
                </Text>
                {!!user?.email && (
                  <Text style={s.email} numberOfLines={2}>
                    {user.email}
                  </Text>
                )}
              </View>
              <View style={s.links}>
                {links.map(item => (
                  <TouchableOpacity
                    key={item.screen}
                    style={s.item}
                    onPress={() => goTo(item.screen)}
                  >
                    <View style={s.icon}>
                      <MaterialIcons
                        name={item.icon}
                        size={20}
                        color="#6dc2f7"
                      />
                    </View>
                    <Text style={s.text}>{item.label}</Text>
                    <MaterialIcons
                      name="chevron-right"
                      size={20}
                      color="#a1abba"
                    />
                  </TouchableOpacity>
                ))}
              </View>
              {!!error && <Text style={s.error}>{error}</Text>}
              <TouchableOpacity
                disabled={busy}
                style={[s.logout, busy && s.disabled]}
                onPress={logout}
              >
                {busy ? (
                  <ActivityIndicator color="#3b5bdb" />
                ) : (
                  <MaterialIcons name="logout" size={20} color="#3b5bdb" />
                )}
                <Text style={s.logoutText}>Se déconnecter</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
}
