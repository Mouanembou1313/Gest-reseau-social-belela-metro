import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RemixIcon from 'react-native-remix-icon';
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from './like.style';

const likesData = [
    {
        id: '1',
        name: 'Jean Dupont',
        message: 'a aimé votre publication',
        time: 'Il y a 5 min',
    },
    {
        id: '2',
        name: 'Alice Martin',
        message: 'a aimé votre photo',
        time: 'Il y a 20 min',
    },
    {
        id: '3',
        name: 'Bob Dupuis',
        message: 'a aimé votre post',
        time: 'Hier',
    },
];

export function LikeScreen() {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <RemixIcon name="arrow-left-line" size={22} color="#111" />
                </TouchableOpacity>

                <Text style={styles.title}>Mentions J’aime</Text>
            </View>

            {/* CONTENT */}
            <FlatList
                data={likesData}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.content}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.avatar}>
                            <RemixIcon name="heart-3-fill" size={20} color="#6dc2f7" />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.message}>{item.message}</Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
