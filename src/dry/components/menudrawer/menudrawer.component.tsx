import React, { useEffect, useRef } from "react";
import {
    View,
    Text, Image,
    TouchableOpacity,
    Animated,
    Dimensions,
    Pressable,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from "./menudrawer.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

type Props = {
    visible: boolean;
    onClose: () => void;
};

export const MenuDrawer = ({ visible, onClose }: Props) => {
    const navigation = useNavigation<any>();

    const goTo = (screen: string) => {
        onClose();
        navigation.navigate(screen);
    };
    // 👉 démarre hors écran à droite
    const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: visible ? 0 : DRAWER_WIDTH,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [visible, slideAnim]);

    if (!visible) return null;


    return (
        <SafeAreaView style={styles.overlay}>
            {/* Drawer */}
            <Animated.View
                style={[
                    styles.drawer,
                    { transform: [{ translateX: slideAnim }] },
                ]}
            >
                {/* PROFILE CARD */}
                <View style={styles.profileCard}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/300' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.lettre}>johndoe@example.com</Text>
                </View>

                {/* 🔎 Rechercher amis */}
                <TouchableOpacity style={styles.item} onPress={() => goTo("search")}>
                    <MaterialIcons name="search" size={22} color="#333" />
                    <Text style={styles.text}>Rechercher des amis</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item} onPress={() => goTo("notification")}>
                    <MaterialIcons name="notifications" size={22} color="#333" />
                    <Text style={styles.text}>Notifications</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item} onPress={() => goTo("account")}>
                    <MaterialIcons name="person" size={22} color="#333" />
                    <Text style={styles.text}>Mon profil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logout}>
                    <MaterialIcons name="logout" size={22} color="#fff" />
                    <Text style={styles.logoutText}>Se déconnecter</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Fond sombre */}
            <Pressable style={styles.backdrop} onPress={onClose} />
        </SafeAreaView>
    );
};