import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    containerT: {
        flex: 1,
        backgroundColor: '#f6f9fc'
    },
    container: {
        padding: 20,
        backgroundColor: '#f6f9fc',
        height: 1000
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e8eaef',
        backgroundColor: '#fff',

    },

    logo: {
        fontSize: 22,
        fontWeight: '700',
        color: '#6dc2f7',
    },
    profileCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        // padding: 25,
        alignItems: 'center',
        marginBottom: 18,
        // marginBottom: 20,
        elevation: 3,
    },

    avatar: {
        width: 100,
        // width: 120,
        height: 100,
        // height: 120,
        borderRadius: 60,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#6dc2f7',
    },

    name: {
        fontSize: 19,
        // fontSize: 22,
        fontWeight: 'bold',
        color: '#6dc2f7',
    },

    email: {
        fontSize: 14,
        color: '#555',
    },

    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 17,
        // padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 2,
    },

    infoText: {
        marginLeft: 15,
    },

    label: {
        fontSize: 14,
        color: '#888',
    },

    value: {
        fontSize: 16,
        // fontSize: 16,
        fontWeight: '600',
    },

    logoutButton: {
        marginTop: 30,
        backgroundColor: '#6dc2f7',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoutText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '600',
    },
})