import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

export const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        flexDirection: "row",
        height: 1000,
        justifyContent: "flex-end", // 👉 drawer collé à droite
    },

    backdrop: {
        height: 1000,
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.35)",
    },

    drawer: {
        width: DRAWER_WIDTH,
        backgroundColor: "#fff",
        padding: 60,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4,
    },

    email: {
        color: "#888",
        marginBottom: 25,
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },

    text: {
        marginLeft: 10,
        fontSize: 16,
    },

    logout: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        backgroundColor: "#84f76d",
        padding: 12,
        borderRadius: 8,
      
    },

    logoutText: {
        marginLeft: 10,
        color: "#fff",
        fontWeight: "bold",

    },
    profileCard: {

        borderRadius: 20,
        padding: 5,
        // padding: 25,
        alignItems: 'center',
        marginBottom: 18,
        // marginBottom: 20,


    },

    avatar: {
        width: 100,
        // width: 120,
        height: 100,
        // height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#5dade2',
    },

    name: {
        fontSize: 19,
        // fontSize: 22,
        fontWeight: 'bold',
        color: '#5dade2',
    },

    lettre: {
        fontSize: 14,
        color: '#555',
    },

});