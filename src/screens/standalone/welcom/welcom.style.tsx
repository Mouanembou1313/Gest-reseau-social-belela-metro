import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.15)",


    },
    container: {
        flex: 1,
        overflow: "hidden",
    },

    title: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "700",
    },

    subtitle: {
        color: "#dbe4ff",
        textAlign: "center",
        marginTop: 10,
    },

    bottom: {
        position: "absolute",
        bottom: 40,
        width: "100%",
        padding: 20
    },

    button: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
    },

    buttonText: {
        color: "#4a6cf7",
        fontWeight: "600",
    },

    linkRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
    },

    link: {
        color: "#fff",
        fontWeight: "600",
        marginLeft: 5,
    }
});