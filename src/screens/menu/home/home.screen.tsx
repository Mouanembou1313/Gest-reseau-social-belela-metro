import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header } from "../../../../src/dry/components/header/header.component";
import { MenuDrawer } from "../../../dry/components/menudrawer/menudrawer.component";

import { PostInputCard } from "./components/postInputCard.component";
import { StoriesList } from "./components/storiesList.component";
import { SuggestionsList } from "./components/suggestionList.component";
import { PostCard } from "./components/postCard.component";

import { storiesData, suggestionsData } from "./data/home.data";
import { styles } from "./home.style";

export default function HomeScreen() {

    const [drawerVisible, setDrawerVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>

            {/* ✅ HEADER FIXE */}
            <Header onMenuPress={() => setDrawerVisible(true)} />

            <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
                <PostInputCard />
                <StoriesList stories={storiesData} />
                <SuggestionsList suggestions={suggestionsData} />
                <PostCard />
            </ScrollView>

            {/* ✅ DRAWER PREMIUM */}
            <MenuDrawer
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
            />

        </SafeAreaView>
    );
}