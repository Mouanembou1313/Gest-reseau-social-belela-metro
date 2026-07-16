import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { styles } from "./register.style";
import { registerUser } from "../../../services/auth.service";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { loginWithGoogleToken } from "../../../services/authSocial.service";

type RegisterScreenProps = {
    onRegisterSuccess: () => void;
};

export function RegisterScreen({ onRegisterSuccess }: RegisterScreenProps) {
    const navigation = useNavigation<any>();

    const [securePassword, setSecurePassword] = useState(true);
    const [secureConfirm, setSecureConfirm] = useState(true);
    const [agreedTerms, setAgreedTerms] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [termsError, setTermsError] = useState("");
    const [globalError, setGlobalError] = useState("");

    const [loading, setLoading] = useState(false);

    const isValidEmail = (value: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    };

    const validatePassword = (value: string) => {
        if (value.length < 8) {
            return "Le mot de passe doit contenir au moins 8 caractères.";
        }

        if (!/[A-Za-z]/.test(value)) {
            return "Le mot de passe doit contenir au moins une lettre.";
        }

        if (!/[0-9]/.test(value)) {
            return "Le mot de passe doit contenir au moins un chiffre.";
        }

        return "";
    };

    const validateForm = () => {
        let isValid = true;

        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        setTermsError("");
        setGlobalError("");

        if (!username.trim()) {
            setUsernameError("Le nom utilisateur est obligatoire.");
            isValid = false;
        } else if (username.trim().length < 3) {
            setUsernameError("Le nom utilisateur doit contenir au moins 3 caractères.");
            isValid = false;
        }

        if (!email.trim()) {
            setEmailError("L'adresse email est obligatoire.");
            isValid = false;
        } else if (!isValidEmail(email)) {
            setEmailError("Adresse email invalide. Exemple : nom@email.com");
            isValid = false;
        }

        const passwordValidation = validatePassword(password);
        if (!password) {
            setPasswordError("Le mot de passe est obligatoire.");
            isValid = false;
        } else if (passwordValidation) {
            setPasswordError(passwordValidation);
            isValid = false;
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Veuillez confirmer votre mot de passe.");
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Les mots de passe ne correspondent pas.");
            isValid = false;
        }

        if (!agreedTerms) {
            setTermsError("Veuillez accepter les conditions d'utilisation.");
            isValid = false;
        }

        return isValid;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            await registerUser(username.trim(), email.trim().toLowerCase(), password);

            // Inscription reussie : AppNavigation affiche onboarding puis loading puis home
            onRegisterSuccess();
        } catch (err: any) {
            setGlobalError(
                err.message || "Inscription impossible. Veuillez réessayer."
            );
        } finally {
            setLoading(false);
        }
    };
    const handleGoogleRegister = async () => {
        try {
            setGlobalError("");
            setLoading(true);

            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });

            const signInResponse = await GoogleSignin.signIn();

            // Si l'utilisateur ferme la fenêtre Google sans choisir de compte
            if (signInResponse.type === "cancelled") {
                return;
            }

            const idToken = signInResponse.data.idToken;

            if (!idToken) {
                setGlobalError("Token Google introuvable.");
                return;
            }

            await loginWithGoogleToken(idToken);

            onRegisterSuccess();
        } catch (err: any) {
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

                <ScrollView
                    style={styles.card}
                    contentContainerStyle={styles.cardContent}
                    showsVerticalScrollIndicator={false}
                    persistentScrollbar={false}
                    keyboardShouldPersistTaps="handled"
                    bounces={false}
                >
                    <Text style={styles.title}>Créer un compte</Text>
                    <Text style={styles.subtitle}>
                        Rejoins Belela et commence à partager tes moments.
                    </Text>

                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Nom utilisateur</Text>
                        <View
                            style={[styles.inputWrapper, usernameError && styles.inputError]}
                        >
                            <Ionicons name="person-outline" size={20} color="#8A94A6" />
                            <TextInput
                                placeholder="John Doe"
                                style={styles.input}
                                placeholderTextColor="#B9C0CC"
                                value={username}
                                onChangeText={(value) => {
                                    setUsername(value);
                                    setUsernameError("");
                                    setGlobalError("");
                                }}
                            />
                        </View>
                        {usernameError ? (
                            <Text style={styles.errorText}>{usernameError}</Text>
                        ) : null}
                    </View>

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
                                placeholder="Minimum 8 caractères"
                                secureTextEntry={securePassword}
                                style={styles.passwordInput}
                                placeholderTextColor="#B9C0CC"
                                value={password}
                                onChangeText={(value) => {
                                    setPassword(value);
                                    setPasswordError("");
                                    setConfirmPasswordError("");
                                    setGlobalError("");
                                }}
                            />
                            <TouchableOpacity
                                onPress={() => setSecurePassword(!securePassword)}
                            >
                                <Ionicons
                                    name={securePassword ? "eye-off-outline" : "eye-outline"}
                                    size={21}
                                    color="#8A94A6"
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.helperText}>
                            Au moins 8 caractères, une lettre et un chiffre.
                        </Text>
                        {passwordError ? (
                            <Text style={styles.errorText}>{passwordError}</Text>
                        ) : null}
                    </View>

                    <View style={styles.passwordContainer}>
                        <Text style={styles.fieldLabel}>Confirmer le mot de passe</Text>
                        <View
                            style={[
                                styles.passwordInputContainer,
                                confirmPasswordError && styles.inputError,
                            ]}
                        >
                            <Ionicons name="shield-checkmark-outline" size={20} color="#8A94A6" />
                            <TextInput
                                placeholder="Répéter le mot de passe"
                                secureTextEntry={secureConfirm}
                                style={styles.passwordInput}
                                placeholderTextColor="#B9C0CC"
                                value={confirmPassword}
                                onChangeText={(value) => {
                                    setConfirmPassword(value);
                                    setConfirmPasswordError("");
                                    setGlobalError("");
                                }}
                            />
                            <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
                                <Ionicons
                                    name={secureConfirm ? "eye-off-outline" : "eye-outline"}
                                    size={21}
                                    color="#8A94A6"
                                />
                            </TouchableOpacity>
                        </View>
                        {confirmPasswordError ? (
                            <Text style={styles.errorText}>{confirmPasswordError}</Text>
                        ) : null}
                    </View>

                    <View style={styles.checkboxRow}>
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => {
                                setAgreedTerms(!agreedTerms);
                                setTermsError("");
                            }}
                        >
                            <View
                                style={[
                                    styles.checkbox,
                                    agreedTerms && styles.checkboxChecked,
                                    termsError && styles.checkboxError,
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

                    {termsError ? <Text style={styles.errorText}>{termsError}</Text> : null}

                    {globalError ? (
                        <View style={styles.errorBox}>
                            <Ionicons name="alert-circle-outline" size={18} color="#EF4444" />
                            <Text style={styles.errorBoxText}>{globalError}</Text>
                        </View>
                    ) : null}

                    <TouchableOpacity
                        style={[styles.button, loading && styles.buttonDisabled]}
                        onPress={handleRegister}
                        disabled={loading}
                        activeOpacity={0.85}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Créer mon compte</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.separator}>
                        <View style={styles.line} />
                        <Text style={styles.orText}>S'inscrire avec</Text>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.circleBtn}>
                            <MaterialIcons name="facebook" size={23} color="#1877F2" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.circleBtn}>
                            <FontAwesome name="twitter" size={22} color="#1DA1F2" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.circleBtn} onPress={handleGoogleRegister}>
                            <Image
                                source={require("../../../assets/images/6.png")}
                                style={styles.icon}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.circleBtn}>
                            <MaterialIcons name="apple" size={24} color="#111827" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.loginRow}>
                        <Text style={styles.loginText}>Vous avez déjà un compte?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("signin")}>
                            <Text style={styles.loginLink}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}