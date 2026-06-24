import React, { useState } from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { styles } from "./onboarding.style";

// Slides affichées dans l'onboarding
const slides = [
    {
        title: "Bienvenue sur Belela",
        description:
            "Découvre un espace social pensé pour partager, échanger et rester proche de ta communauté.",
        icon: "people-outline",
    },
    {
        title: "Publie tes moments",
        description:
            "Partage tes idées, tes photos et tes expériences avec les personnes qui comptent pour toi.",
        icon: "image-outline",
    },
    {
        title: "Reste connecté",
        description:
            "Suis les notifications, les interactions et les nouvelles publications en temps réel.",
        icon: "notifications-outline",
    },
];

type OnboardingScreenProps = {
    onFinish: () => void;
};

export function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentSlide = slides[currentIndex];
    const isLastSlide = currentIndex === slides.length - 1;

    // Passe à la slide suivante ou termine l'onboarding
    const handleNext = () => {
        if (isLastSlide) {
            onFinish();
            return;
        }

        setCurrentIndex((prev) => prev + 1);
    };

    // Permet d'accéder directement à l'application
    const handleSkip = () => {
        onFinish();
    };

    return (
        <ImageBackground
            source={require("../../../assets/images/9.jpg")}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <View style={styles.header}>
                    {!isLastSlide ? (
                        <TouchableOpacity onPress={handleSkip}>
                            <Text style={styles.skipText}>Passer</Text>
                        </TouchableOpacity>
                    ) : (
                        <View />
                    )}
                </View>

                <View style={styles.content}>
                    <View style={styles.iconCircle}>
                        <Ionicons name={currentSlide.icon} size={74} color="#6EC6FF" />
                    </View>

                    <Text style={styles.title}>{currentSlide.title}</Text>

                    <Text style={styles.description}>{currentSlide.description}</Text>

                    <View style={styles.dotsContainer}>
                        {slides.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    currentIndex === index && styles.activeDot,
                                ]}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonText}>
                            {isLastSlide ? "Commencer" : "Suivant"}
                        </Text>

                        <Ionicons
                            name={isLastSlide ? "checkmark-outline" : "arrow-forward-outline"}
                            size={22}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}