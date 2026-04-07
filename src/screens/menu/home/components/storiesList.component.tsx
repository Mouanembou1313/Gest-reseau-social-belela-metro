import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "../home.style";
import { Story } from "../data/home.data";

type Props = {
    stories: Story[];
};

export const StoriesList = ({ stories }: Props) => {
    return (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Stories</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, marginBottom: 16 }}
            >
                {stories.map((s) => (
                    <View key={s.id} style={styles.storyCard}>
                        <Image source={{ uri: s.img }} style={styles.storyImage} />
                        <Image source={{ uri: s.img }} style={styles.storyAvatar} />
                        {s.isMe && (
                            <View style={styles.addBadge}>
                                <MaterialIcons name="add" size={16} color="#fff" />
                            </View>
                        )}
                        <View style={styles.storyLabel}>
                            <Text style={styles.storyLabelText} numberOfLines={1}>
                                {s.name}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
