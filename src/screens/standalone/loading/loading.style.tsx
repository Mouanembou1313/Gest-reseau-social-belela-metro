import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.84)",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 28,
    },

    card: {
        width: "100%",
        borderRadius: 28,
        backgroundColor: "#fff",
        paddingHorizontal: 26,
        paddingVertical: 34,
        alignItems: "center",
        shadowColor: "#6EC6FF",
        shadowOpacity: 0.25,
        shadowRadius: 22,
        shadowOffset: { width: 0, height: 12 },
        elevation: 8,
    },

    logo: {
        fontSize: 34,
        fontWeight: "900",
        color: "#6EC6FF",
        marginBottom: 18,
    },

    title: {
        fontSize: 22,
        fontWeight: "800",
        color: "#2E3A59",
        textAlign: "center",
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: "#7B8494",
        textAlign: "center",
        marginBottom: 28,
    },

    progressContainer: {
        width: "100%",
        height: 12,
        borderRadius: 12,
        backgroundColor: "#E5EEF7",
        overflow: "hidden",
        marginBottom: 14,
    },

    progressBar: {
        height: "100%",
        borderRadius: 12,
        backgroundColor: "#6EC6FF",
    },

    percent: {
        fontSize: 16,
        fontWeight: "800",
        color: "#2E3A59",
    },
});