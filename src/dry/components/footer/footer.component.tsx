import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const tabs = [
  { name: 'home', label: 'Accueil', icon: 'home', inactive: 'home' },
  { name: 'post', label: 'Publier', icon: 'add', inactive: 'add' },
  {
    name: 'account',
    label: 'Compte',
    icon: 'person',
    inactive: 'person-outline',
  },
] as const;

export function FooterComponent({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hide = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  if (keyboardVisible) return null;
  const activeName = state.routes[state.index].name;
  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 8),
          paddingLeft: Math.max(insets.left, 12),
          paddingRight: Math.max(insets.right, 12),
        },
      ]}
    >
      {tabs.map(tab => {
        const route = state.routes.find(item => item.name === tab.name);
        if (!route) return null;
        const selected = activeName === tab.name;
        const publishing = tab.name === 'post';
        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.8}
            style={styles.item}
            accessibilityRole="tab"
            accessibilityLabel={
              descriptors[route.key].options.tabBarAccessibilityLabel ||
              tab.label
            }
            accessibilityState={{ selected }}
            onLongPress={() =>
              navigation.emit({ type: 'tabLongPress', target: route.key })
            }
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!selected && !event.defaultPrevented)
                navigation.navigate(route.name, route.params);
            }}
          >
            {publishing ? (
              <View style={[styles.publish, selected && styles.publishActive]}>
                <MaterialIcons name="add" size={27} color="#fff" />
              </View>
            ) : (
              <View style={[styles.icon, selected && styles.selectedIcon]}>
                <MaterialIcons
                  name={selected ? tab.icon : tab.inactive}
                  size={24}
                  color={selected ? '#3b5bdb' : '#8c97a8'}
                />
              </View>
            )}
            <Text style={[styles.label, selected && styles.selectedLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eaf0f6',
    paddingTop: 8,
  },
  item: {
    flex: 1,
    minHeight: 66,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  icon: {
    width: 48,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIcon: { backgroundColor: '#e9f5ff' },
  label: { fontSize: 11, color: '#8c97a8', fontWeight: '500' },
  selectedLabel: { color: '#3b5bdb', fontWeight: '700' },
  publish: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#6dc2f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishActive: { backgroundColor: '#3b5bdb' },
});
