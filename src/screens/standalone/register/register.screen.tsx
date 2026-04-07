import React, { useState } from "react";
import {
    Image,
    ImageBackground,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { styles } from "./register.style";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export function RegisterScreen() {
    const navigation = useNavigation<any>();
    const [securePassword, setSecurePassword] = useState(true);
    const [secureConfirm, setSecureConfirm] = useState(true);
    const [agreedTerms, setAgreedTerms] = useState(false);

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
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                style={styles.card} 
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
            >
                <Text style={styles.title}>Create Account</Text>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Full Name</Text>
                    <TextInput
                        placeholder="John Doe"
                        style={styles.input}
                        placeholderTextColor="#ccc"
                    />
                </View>

                <View style={styles.fieldContainer}>
                    <Text style={styles.fieldLabel}>Email</Text>
                    <TextInput
                        placeholder="kristin@example.com"
                        style={styles.input}
                        placeholderTextColor="#ccc"
                    />
                </View>

                <View style={styles.passwordContainer}>
                    <View style={styles.passwordLabelContainer}>
                        <Text style={styles.passwordLabel}>Password</Text>
                    </View>
                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            placeholder="••••••••••"
                            secureTextEntry={securePassword}
                            style={styles.passwordInput}
                            placeholderTextColor="#ccc"
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
                        <Text style={styles.passwordLabel}>Confirm Password</Text>
                    </View>
                    <View style={styles.passwordInputContainer}>
                        <TextInput
                            placeholder="••••••••••"
                            secureTextEntry={secureConfirm}
                            style={styles.passwordInput}
                            placeholderTextColor="#ccc"
                        />
                        <TouchableOpacity
                            onPress={() => setSecureConfirm(!secureConfirm)}
                        >
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
                                <MaterialIcons
                                    name="check"
                                    size={14}
                                    color="#fff"
                                />
                            )}
                        </View>
                        <Text style={styles.checkboxText}>
                            I agree to the Terms & Conditions
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>

                <View style={styles.separator}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>Sign up with</Text>
                    <View style={styles.line} />
                </View>

                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.circleBtn}>
                        <MaterialIcons
                            name="facebook"
                            size={24}
                            color="#1877F2"
                        />
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
                    <Text style={styles.loginText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("login")}>
                        <Text style={styles.loginLink}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}