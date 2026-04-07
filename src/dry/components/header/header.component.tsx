import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from "./header.style";

type Props = {
    onMenuPress?: () => void;
};

export const Header: React.FC<Props> = ({ onMenuPress }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>Belela</Text>

            <TouchableOpacity onPress={onMenuPress} activeOpacity={0.7}>
                <MaterialIcons name="menu" size={28} color="#6dc2f7" />
            </TouchableOpacity>
        </View>
    );
};