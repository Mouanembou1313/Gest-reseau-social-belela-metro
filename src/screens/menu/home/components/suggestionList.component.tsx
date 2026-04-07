import React from "react";
import { Alert, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Suggestion } from "../data/home.data";
import { styles } from "../home.style";

type Props = {
    suggestions: Suggestion[];
};

export const SuggestionsList = ({ suggestions }: Props) => {
    return (
        <View>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Personnes que vous connaissez</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, marginBottom: 8 }}
            >
                {suggestions.map((user) => (
                    <View key={user.id} style={styles.suggestionCard}>
                        <Image source={{ uri: user.avatar }} style={styles.suggestionAvatar} />
                        <Text style={styles.suggestionName}>{user.name}</Text>
                        <Text style={styles.suggestionMutual}>{user.mutual} amis en commun</Text>
                        <View style={styles.suggestionButtons}>
                            <TouchableOpacity
                                style={styles.pillBtn}
                                onPress={() => Alert.alert(`Demande d'ami envoyée à ${user.name}`)}
                            >
                                <MaterialIcons name="person-add" size={18} color="#6dc2f7" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.pillBtn, { marginLeft: 8 }]}
                                onPress={() => Alert.alert(`Suggestion supprimée pour ${user.name}`)}
                            >
                                <MaterialIcons name="delete-outline" size={18} color="#6dc2f7" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
