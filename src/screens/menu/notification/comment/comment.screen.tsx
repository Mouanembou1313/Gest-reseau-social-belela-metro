import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RemixIcon from 'react-native-remix-icon';
import { styles } from './comment.style';
import { SafeAreaView } from "react-native-safe-area-context";
const commentsData = [
    {
        id: '1',
        name: 'Marie Lopez',
        comment: 'Super publication 👏',
        time: 'Il y a 3 min',
    },
    {
        id: '2',
        name: 'Kevin Paul',
        comment: 'Très inspirant 🔥',
        time: 'Il y a 15 min',
    },
];

export function CommentScreen() {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <RemixIcon name="arrow-left-line" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={styles.title}>Commentaires</Text>
            </View>

            <FlatList
                data={commentsData}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.content}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.avatar}>
                            <RemixIcon name="chat-3-fill" size={20} color="#6dc2f7" />
                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.comment}>{item.comment}</Text>
                            <Text style={styles.time}>{item.time}</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
