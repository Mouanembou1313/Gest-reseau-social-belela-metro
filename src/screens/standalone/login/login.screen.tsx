import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { styles } from "./login.style";
import { loginUser } from "../../../services/auth.service";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { loginWithGoogleToken } from "../../../services/authSocial.service";

type LoginScreenProps = {
    onLoginSuccess: () => void;
};

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
    const navigation = useNavigation<any>();

    const [secure, setSecure] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [globalError, setGlobalError] = useState("");

    const [loading, setLoading] = useState(false);

    const isValidEmail = (value: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    };

    const validateForm = () => {
        let isValid = true;

        setEmailError("");
        setPasswordError("");
        setGlobalError("");

        if (!email.trim()) {
            setEmailError("L'adresse email est obligatoire.");
            isValid = false;
        } else if (!isValidEmail(email)) {
            setEmailError("Veuillez saisir une adresse email valide.");
            isValid = false;
        }

        if (!password) {
            setPasswordError("Le mot de passe est obligatoire.");
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            await loginUser(email.trim().toLowerCase(), password);

            // Connexion reussie : AppNavigation affiche l'ecran loading puis home
            onLoginSuccess();
        } catch (err: any) {
            setGlobalError(
                err.message || "Connexion impossible. Veuillez réessayer."
            );
        } finally {
            setLoading(false);
        }
    };
    const handleGoogleLogin = async () => {
        try {
            setGlobalError("");
            setLoading(true);

            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });

            await GoogleSignin.signIn();

            const tokens = await GoogleSignin.getTokens();

            console.log("GOOGLE TOKENS:", tokens);

            if (!tokens.idToken) {
                setGlobalError("Google n'a pas retourné de idToken.");
                return;
            }

            await loginWithGoogleToken(tokens.idToken);

            onLoginSuccess();
        } catch (err: any) {
            console.log("GOOGLE REGISTER ERROR:", err);
            setGlobalError(err.message || "Connexion Google impossible.");
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
            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
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
                    <Text style={styles.subtitle}>
                        Heureux de te revoir. Connecte-toi pour continuer.
                    </Text>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Email</Text>
                        <View style={[styles.inputWrapper, emailError && styles.inputError]}>
                            <Ionicons name="mail-outline" size={20} color="#8A94A6" />
                            <TextInput
                                placeholder="kristin@example.com"
                                style={styles.input}
                                placeholderTextColor="#B9C0CC"
                                value={email}
                                onChangeText={(value) => {
                                    setEmail(value);
                                    setEmailError("");
                                    setGlobalError("");
                                }}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    </View>

                    <View style={styles.passwordContainer}>
                        <Text style={styles.fieldLabel}>Mot de passe</Text>
                        <View
                            style={[
                                styles.passwordInputContainer,
                                passwordError && styles.inputError,
                            ]}
                        >
                            <Ionicons name="lock-closed-outline" size={20} color="#8A94A6" />
                            <TextInput
                                placeholder="••••••••"
                                secureTextEntry={secure}
                                style={styles.passwordInput}
                                placeholderTextColor="#B9C0CC"
                                value={password}
                                onChangeText={(value) => {
                                    setPassword(value);
                                    setPasswordError("");
                                    setGlobalError("");
                                }}
                            />
                            <TouchableOpacity onPress={() => setSecure(!secure)}>
                                <Ionicons
                                    name={secure ? "eye-off-outline" : "eye-outline"}
                                    size={21}
                                    color="#8A94A6"
                                />
                            </TouchableOpacity>
                        </View>
                        {passwordError ? (
                            <Text style={styles.errorText}>{passwordError}</Text>
                        ) : null}
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

                    {globalError ? (
                        <View style={styles.errorBox}>
                            <Ionicons name="alert-circle-outline" size={18} color="#EF4444" />
                            <Text style={styles.errorBoxText}>{globalError}</Text>
                        </View>
                    ) : null}

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.85}
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
                            <MaterialIcons name="facebook" size={21} color="#1877F2" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.circleBtn}>
                            <FontAwesome name="twitter" size={20} color="#1DA1F2" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.circleBtn} onPress={handleGoogleLogin}>
                            <Image
                                source={require("../../../assets/images/6.png")}
                                style={styles.icon}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.circleBtn}>
                            <MaterialIcons name="apple" size={22} color="#111827" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.signupRow}>
                        <Text style={styles.signupText}>Vous n'avez pas de compte?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                            <Text style={styles.signupLink}>Créer un compte</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}