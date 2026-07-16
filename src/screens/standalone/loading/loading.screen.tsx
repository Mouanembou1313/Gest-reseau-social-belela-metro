import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    ImageBackground,
    Text,
    View,
} from "react-native";

import { styles } from "./loading.style";

type LoadingScreenProps = {
    onFinish: () => void;
};

export function LoadingScreen({ onFinish }: LoadingScreenProps) {
    const progressAnim = useRef(new Animated.Value(0)).current;
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Ecoute la valeur animée pour afficher le pourcentage
        const listener = progressAnim.addListener(({ value }) => {
            setProgress(Math.round(value));
        });

        // Animation de 0 à 100 avant d'ouvrir l'application
        Animated.timing(progressAnim, {
            toValue: 100,
            duration: 1800,
            useNativeDriver: false,
        }).start(() => {
            progressAnim.removeListener(listener);
            onFinish();
        });

        return () => {
            progressAnim.removeListener(listener);
        };
    }, [onFinish, progressAnim]);

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
    });

    return (
        <ImageBackground
            source={require("../../../assets/images/9.jpg")}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Text style={styles.logo}>Belela</Text>

                    <Text style={styles.title}>Préparation de ton espace</Text>

                    <Text style={styles.subtitle}>
                        Nous chargeons ton fil, tes interactions et tes préférences.
                    </Text>

                    <View style={styles.progressContainer}>
                        <Animated.View
                            style={[
                                styles.progressBar,
                                {
                                    width: progressWidth,
                                },
                            ]}
                        />
                    </View>

                    <Text style={styles.percent}>{progress}%</Text>
                </View>
            </View>
        </ImageBackground>
    );
}