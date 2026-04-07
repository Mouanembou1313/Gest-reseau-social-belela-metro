import React, { useState } from "react";
import {
    ImageBackground,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native";
import { styles } from "./login.style";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export function LoginScreen() {
    const navigation = useNavigation<any>();
    const [secure, setSecure] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <ImageBackground
            source={require("../../../assets/images/9.jpg")}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.top}>
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backIcon}>‹</Text>
                    <Text style={styles.backText}>Retour</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                {/* Title DANS le card */}
                <Text style={styles.title1}>Connexion</Text>

                {/* EMAIL FIELD avec label flottant */}
                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Email</Text>
                    <TextInput
                        placeholder="kristin@example.com"
                        style={styles.input}
                        placeholderTextColor="#ccc"
                    />
                </View>

                {/* PASSWORD FIELD avec label flottant */}
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

                {/* Remember Me + Forgot Password */}
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
                                <MaterialIcons
                                    name="check"
                                    size={14}
                                    color="#fff"
                                />
                            )}
                        </View>
                        <Text style={styles.checkboxText}>Se souvenir de moi</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>
                            Mot de passe oublier?
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Se conncter</Text>
                </TouchableOpacity>

                {/* Separator */}
                <View style={styles.separator}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>Se connceter avec</Text>
                    <View style={styles.line} />
                </View>

                {/* Social Icons */}
                <View style={styles.socialRow}>
                    {/* Facebook */}
                    <TouchableOpacity style={styles.circleBtn}>
                        <MaterialIcons
                            name="facebook"
                            size={20}
                            color="#1877F2"
                        />
                    </TouchableOpacity>

                    {/* Twitter */}
                    <TouchableOpacity style={styles.circleBtn}>
                        <FontAwesome name="twitter" size={20} color="#1DA1F2" />
                    </TouchableOpacity>

                    {/* Google */}
                    <TouchableOpacity style={styles.circleBtn}>
                        <Image
                            source={require("../../../assets/images/6.png")}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                    {/* Apple */}
                    <TouchableOpacity style={styles.circleBtn}>
                        <MaterialIcons name="apple" size={20} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Signup Link */}
                <View style={styles.signupRow}>
                    <Text style={styles.signupText}>
                        Avez vous un compte?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                        <Text style={styles.signupLink}>Créer un copte</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}