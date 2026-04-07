import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { FRIENDS } from "./search.data";
import { styles } from "./search.style";

export const SearchScreen = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState("");

    const filtered = FRIENDS.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back-ios" size={22} color="#111" />
                </TouchableOpacity>

                <Text style={styles.title}>Rechercher des amis</Text>

                <View style={{ width: 24 }} />
            </View>

            {/* SEARCH BOX */}
            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Rechercher..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.input}
                />
            </View>

            {/* LISTE */}
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />

                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.username}>{item.username}</Text>
                        </View>

                        <TouchableOpacity style={styles.addBtn}>
                            <Text style={styles.addText}>Ajouter</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};