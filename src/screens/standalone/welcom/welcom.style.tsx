import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: "hidden",
    },

    overlay: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: "rgba(15, 23, 42, 0.18)",
        paddingHorizontal: 24,
        paddingTop: 76,
        paddingBottom: 80,
    },

    hero: {
        alignItems: "center",
        paddingHorizontal: 8,
    },

    badge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        backgroundColor: "rgba(255, 255, 255, 0.92)",
        borderRadius: 999,
        paddingHorizontal: 14,
        paddingVertical: 8,
        marginBottom: 22,
        shadowColor: "#1E293B",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 14,
        elevation: 4,
    },

    badgeText: {
        color: "#475569",
        fontSize: 13,
        fontWeight: "800",
    },

    title: {
        color: "#fff",
        fontSize: 48,
        fontWeight: "900",
        textAlign: "center",
        letterSpacing: 0,
        textShadowColor: "rgba(15, 23, 42, 0.18)",
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 12,
    },

    subtitle: {
        color: "#F8FAFC",
        textAlign: "center",
        marginTop: 14,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "600",
        textShadowColor: "rgba(15, 23, 42, 0.18)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },

    bottomCard: {
        width: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.96)",
        borderRadius: 30,
        paddingHorizontal: 22,
        paddingTop: 26,
        paddingBottom: 22,
        shadowColor: "#1E293B",
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.18,
        shadowRadius: 24,
        elevation: 10,
    },

    cardTitle: {
        color: "#1F2937",
        fontSize: 22,
        fontWeight: "900",
        textAlign: "center",
        marginBottom: 8,
    },

    cardSubtitle: {
        color: "#8A94A6",
        fontSize: 14,
        lineHeight: 21,
        fontWeight: "600",
        textAlign: "center",
        marginBottom: 22,
    },

    primaryButton: {
        height: 58,
        borderRadius: 18,
        backgroundColor: "#6dc2f7",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        shadowColor: "#6dc2f7",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8,
    },

    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "900",
    },

    secondaryButton: {
        height: 56,
        borderRadius: 18,
        backgroundColor: "#F8FAFC",
        borderWidth: 1,
        borderColor: "#E5EAF2",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        marginTop: 13,
    },

    secondaryButtonText: {
        color: "#6dc2f7",
        fontSize: 16,
        fontWeight: "900",
    },

    footerTextRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 5,
        marginTop: 18,
    },

    footerText: {
        color: "#8A94A6",
        fontSize: 13,
        fontWeight: "600",
    },

    footerLink: {
        color: "#3b5bdb",
        fontSize: 13,
        fontWeight: "900",
    },
});