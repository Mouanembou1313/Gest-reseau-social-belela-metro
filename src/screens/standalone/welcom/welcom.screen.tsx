import React from "react";
import {
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { styles } from "./welcom.style";

export function WelcomeScreen() {
    const navigation = useNavigation<any>();

    return (
        <ImageBackground
            source={require("../../../assets/images/9.jpg")}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <View style={styles.hero}>
                    <View style={styles.badge}>
                        <Ionicons name="sparkles-outline" size={18} color="#6dc2f7" />
                        <Text style={styles.badgeText}>Bienvenue</Text>
                    </View>

                    <Text style={styles.title}>Belela</Text>

                    <Text style={styles.subtitle}>
                        Partage tes moments, retrouve ta communauté et reste connecté à ce
                        qui compte vraiment.
                    </Text>
                </View>

                <View style={styles.bottomCard}>
                    <Text style={styles.cardTitle}>Prêt à commencer?</Text>

                    <Text style={styles.cardSubtitle}>
                        Connecte-toi ou crée ton compte pour accéder à ton espace.
                    </Text>

                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate("signin")}
                        activeOpacity={0.85}
                    >
                        <Text style={styles.primaryButtonText}>Se connecter</Text>
                        <Ionicons name="arrow-forward-outline" size={21} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate("signup")}
                        activeOpacity={0.85}
                    >
                        <Ionicons name="person-add-outline" size={20} color="#6dc2f7" />
                        <Text style={styles.secondaryButtonText}>Créer un compte</Text>
                    </TouchableOpacity>

                    <View style={styles.footerTextRow}>
                        <Text style={styles.footerText}>Nouveau sur Belela?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                            <Text style={styles.footerLink}>Rejoindre maintenant</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}