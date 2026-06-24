import React, { useState } from "react";
import {
    ImageBackground,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import { styles } from "./login.style";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Service qui appelle ton API Node.js
import { loginUser } from "../../../services/service.authService";

export function LoginScreen({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const navigation = useNavigation<any>();

    // Afficher / masquer le mot de passe
    const [secure, setSecure] = useState(true);

    // Option visuelle "Se souvenir de moi"
    const [rememberMe, setRememberMe] = useState(false);

    // Champs du formulaire
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Etats d'interface
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fonction appelée quand l'utilisateur clique sur "Se connecter"
    const handleLogin = async () => {
        try {
            setError("");

            // Petite validation côté frontend avant d'appeler l'API
            if (!email.trim() || !password) {
                setError("Veuillez renseigner votre email et votre mot de passe.");
                return;
            }

            setLoading(true);

            // Appel API : POST /login
            await loginUser(email.trim(), password);

            // Après connexion réussie, va vers ton écran principal.
            // Remplace "home" par le vrai nom de ta navigation principale si besoin.
          onLoginSuccess();
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue pendant la connexion.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require("../../../assets/images/9.jpg")}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.top}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backIcon}>‹</Text>
                    <Text style={styles.backText}>Retour</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.title1}>Connexion</Text>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Email</Text>
                    <TextInput
                        placeholder="kristin@example.com"
                        style={styles.input}
                        placeholderTextColor="#ccc"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.passwordContainer}>
                    <View style={styles.passwordLabelContainer}>
                        <Text style={styles.passwordLabel}>Mot de passe</Text>
                    </View>

                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            placeholder="••••••••••"
                            secureTextEntry={secure}
                            style={styles.passwordInput}
                            placeholderTextColor="#ccc"
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity onPress={() => setSecure(!secure)}>
                            <Ionicons
                                name={secure ? "eye-off" : "eye"}
                                size={20}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.checkboxRow}>
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setRememberMe(!rememberMe)}
                    >
                        <View
                            style={[
                                styles.checkbox,
                                rememberMe && styles.checkboxChecked,
                            ]}
                        >
                            {rememberMe && (
                                <MaterialIcons name="check" size={14} color="#fff" />
                            )}
                        </View>

                        <Text style={styles.checkboxText}>Se souvenir de moi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Mot de passe oublié?</Text>
                    </TouchableOpacity>
                </View>

                {/* Message d'erreur venant du frontend ou de l'API */}
                {error ? (
                    <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
                ) : null}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Se connecter</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.separator}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>Se connecter avec</Text>
                    <View style={styles.line} />
                </View>

                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.circleBtn}>
                        <MaterialIcons name="facebook" size={20} color="#1877F2" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.circleBtn}>
                        <FontAwesome name="twitter" size={20} color="#1DA1F2" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.circleBtn}>
                        <Image
                            source={require("../../../assets/images/6.png")}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.circleBtn}>
                        <MaterialIcons name="apple" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.signupRow}>
                    <Text style={styles.signupText}>Vous n'avez pas de compte?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                        <Text style={styles.signupLink}>Créer un compte</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}