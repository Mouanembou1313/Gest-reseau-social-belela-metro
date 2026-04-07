import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fbff",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eef2f7",
    },

    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
        color: "#111",
    },

    searchBox: {
        backgroundColor: "#fff",
        margin: 16,
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: "#e6ecf2",
    },

    input: {
        fontSize: 15,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 14,
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 16,
    },

    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
        marginRight: 12,
    },

    info: {
        flex: 1,
    },

    name: {
        fontWeight: "600",
        fontSize: 15,
    },

    username: {
        color: "#7c8592",
        fontSize: 13,
        marginTop: 2,
    },

    addBtn: {
        backgroundColor: "#6dc2f7",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
    },

    addText: {
        color: "#fff",
        fontWeight: "600",
    },
});