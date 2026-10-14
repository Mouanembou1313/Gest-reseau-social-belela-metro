import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './header.style';

type Props = { onMenuPress?: () => void; title?: string };
export const Header = ({ onMenuPress, title }: Props) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.header}>
      <View style={styles.brand}>
        <Text style={styles.logo}>Belela</Text>
        {!!title && (
          <Text style={styles.section} numberOfLines={1}>
            {title}
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.iconButton}
          accessibilityLabel="Rechercher"
          accessibilityRole="button"
          onPress={() => navigation.navigate('main', { screen: 'search' })}
        >
          <MaterialIcons name="search" size={22} color="#526176" />
        </TouchableOpacity>
        {onMenuPress && (
          <TouchableOpacity
            style={styles.iconButton}
            accessibilityLabel="Ouvrir le menu"
            accessibilityRole="button"
            onPress={onMenuPress}
          >
            <MaterialIcons name="menu" size={23} color="#3b5bdb" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
