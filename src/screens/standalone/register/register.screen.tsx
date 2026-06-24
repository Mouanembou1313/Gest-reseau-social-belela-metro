import React, { useState } from "react";
import {
    Image,
    ImageBackground,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { styles } from "./register.style";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Service qui appelle ton API Node.js
import { registerUser } from "../../../services/service.authService";

export function RegisterScreen({
    onRegisterSuccess,
}: {
    onRegisterSuccess: () => void;
}) {
    const navigation = useNavigation<any>();

    // Afficher / masquer les mots de passe
    const [securePassword, setSecurePassword] = useState(true);
    const [secureConfirm, setSecureConfirm] = useState(true);

    // Case à cocher des conditions
    const [agreedTerms, setAgreedTerms] = useState(false);

    // Champs du formulaire
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Etats d'interface
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fonction appelée quand l'utilisateur clique sur "Sign up"
    const handleRegister = async () => {
        try {
            setError("");

            // Validations simples côté frontend
            if (!username.trim() || !email.trim() || !password || !confirmPassword) {
                setError("Veuillez remplir tous les champs.");
                return;
            }

            if (password.length < 6) {
                setError("Le mot de passe doit contenir au moins 6 caractères.");
                return;
            }

            if (password !== confirmPassword) {
                setError("Les mots de passe ne correspondent pas.");
                return;
            }

            if (!agreedTerms) {
                setError("Veuillez accepter les conditions.");
                return;
            }

            setLoading(true);

            // Appel API : POST /register
            await registerUser(username.trim(), email.trim(), password);

            // Après inscription réussie, va vers ton écran principal.
            // Remplace "home" par le vrai nom de ta navigation principale si besoin.
            onRegisterSuccess();
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue pendant l'inscription.");
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

            <ScrollView
                style={styles.card}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
            >
                <Text style={styles.title}>Créer un compte</Text>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Nom utilisateur</Text>
                    <TextInput
                        placeholder="John Doe"
                        style={styles.input}
                        placeholderTextColor="#ccc"
                        value={username}
                        onChangeText={setUsername}
                    />
                </View>

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
                            secureTextEntry={securePassword}
                            style={styles.passwordInput}
                            placeholderTextColor="#ccc"
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity
                            onPress={() => setSecurePassword(!securePassword)}
                        >
                            <Ionicons
                                name={securePassword ? "eye-off" : "eye"}
                                size={20}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.passwordContainer}>
                    <View style={styles.passwordLabelContainer}>
                        <Text style={styles.passwordLabel}>Confirmer le mot de passe</Text>
                    </View>

                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            placeholder="••••••••••"
                            secureTextEntry={secureConfirm}
                            style={styles.passwordInput}
                            placeholderTextColor="#ccc"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
                            <Ionicons
                                name={secureConfirm ? "eye-off" : "eye"}
                                size={20}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.checkboxRow}>
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setAgreedTerms(!agreedTerms)}
                    >
                        <View
                            style={[
                                styles.checkbox,
                                agreedTerms && styles.checkboxChecked,
                            ]}
                        >
                            {agreedTerms && (
                                <MaterialIcons name="check" size={14} color="#fff" />
                            )}
                        </View>

                        <Text style={styles.checkboxText}>
                            J'accepte les conditions d'utilisation
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Message d'erreur venant du frontend ou de l'API */}
                {error ? (
                    <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>
                ) : null}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>S'inscrire</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.separator}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>S'inscrire avec</Text>
                    <View style={styles.line} />
                </View>

                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.circleBtn}>
                        <MaterialIcons name="facebook" size={24} color="#1877F2" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.circleBtn}>
                        <FontAwesome name="twitter" size={24} color="#1DA1F2" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.circleBtn}>
                        <Image
                            source={require("../../../assets/images/6.png")}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.circleBtn}>
                        <MaterialIcons name="apple" size={24} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.loginRow}>
                    <Text style={styles.loginText}>Vous avez déjà un compte?</Text>

                    {/* Dans ton AuthNavigation, l'écran login s'appelle "signin" */}
                    <TouchableOpacity onPress={() => navigation.navigate("signin")}>
                        <Text style={styles.loginLink}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}