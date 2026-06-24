import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.82)",
        paddingHorizontal: 28,
        paddingTop: 54,
        paddingBottom: 34,
    },

    header: {
        height: 40,
        alignItems: "flex-end",
        justifyContent: "center",
    },

    skipText: {
        color: "#6EC6FF",
        fontSize: 16,
        fontWeight: "700",
    },

    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    iconCircle: {
        width: width * 0.48,
        height: width * 0.48,
        maxWidth: 210,
        maxHeight: 210,
        borderRadius: 110,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 34,
        shadowColor: "#6EC6FF",
        shadowOpacity: 0.25,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
    },

    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#2E3A59",
        textAlign: "center",
        marginBottom: 16,
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#6B7280",
        textAlign: "center",
        paddingHorizontal: 6,
    },

    dotsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 34,
    },

    dot: {
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: "#D5DEE8",
        marginHorizontal: 5,
    },

    activeDot: {
        width: 28,
        backgroundColor: "#6EC6FF",
    },

    footer: {
        paddingBottom: 6,
    },

    button: {
        height: 62,
        borderRadius: 18,
        backgroundColor: "#6EC6FF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        shadowColor: "#6EC6FF",
        shadowOpacity: 0.35,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
    },

    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "800",
    },
});