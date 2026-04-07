// src/screens/menu/notification/notification.style.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f9fc',
    },

    /* ---------- Header ---------- */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#eef2f7',
    },
    backBtn: {
        padding: 6,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1b1e27',
    },

    /* ---------- List ---------- */
    list: {
        padding: 16,
    },

    /* ---------- Card ---------- */
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 14,
        borderRadius: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eef2f7',
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#e7f3ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    textBox: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1b1e27',
    },
    time: {
        fontSize: 12,
        color: '#65708a',
        marginTop: 4,
    },
});
