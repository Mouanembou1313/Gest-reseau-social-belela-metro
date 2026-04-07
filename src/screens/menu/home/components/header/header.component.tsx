import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { styles } from './header.style';

type HeaderProps = {
    onRightPress?: () => void;
};

export default function Header({ onRightPress }: HeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Belela</Text>

            <TouchableOpacity
                style={styles.iconBtn}
                activeOpacity={0.7}
                onPress={onRightPress}
            >
                <RemixIcon name="notification-3-line" size={22} color="#6dc2f7" />
            </TouchableOpacity>
        </View>
    );
}
