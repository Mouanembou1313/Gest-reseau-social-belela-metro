import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "./welcom.style";
import { useNavigation } from "@react-navigation/native";


export function WelcomeScreen() {
    const navigation = useNavigation<any>();

    return (

        <ImageBackground
            source={require("../../../assets/images/9.jpg")}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>Bienvenue sur Belela!</Text>

                <Text style={styles.subtitle}>
                    Entrez les informations de votre compte
                </Text>

                <View style={styles.bottom}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate("signin")}
                    >
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>

                    <View style={styles.linkRow}>
                        <Text style={{ color: "#fff" }}>Avez vous un compte ?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                            <Text style={styles.link}>Créer un compte</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>

    );
}