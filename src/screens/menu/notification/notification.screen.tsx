import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RemixIcon from 'react-native-remix-icon';
import { useNavigation } from '@react-navigation/native';

import { styles } from './notification.style';
import { NOTIFICATIONS, NotificationItem } from './data/notification.data';

export function NotificationScreen() {

    const navigation = useNavigation<any>();

    /* 🔥 FONCTION NAVIGATION SELON TYPE */
    const handlePress = (item: NotificationItem) => {

        if (item.icon === 'heart-3-fill') {
            navigation.navigate('like');
        }

        else if (item.icon === 'chat-3-fill') {
            navigation.navigate('comment');
        }

        else if (item.icon === 'user-add-fill') {
            navigation.navigate('request');
        }
    };

    const renderItem = ({ item }: { item: NotificationItem }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item)}
            activeOpacity={0.8}
        >
            <View style={styles.iconBox}>
                <RemixIcon name={item.icon} size={20} color="#6dc2f7" />
            </View>

            <View style={styles.textBox}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <RemixIcon
                        name="arrow-left-line"
                        size={22}
                        color="#1b1e27"
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Notifications</Text>
            </View>

            {/* LIST */}
            <FlatList
                data={NOTIFICATIONS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

        </SafeAreaView>
    );
}