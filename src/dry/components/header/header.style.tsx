import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: '#e8eaef',
        borderTopColor: '#e8eaef',
        backgroundColor: '#fff',

    },
    logo: {
        fontSize: 24,
        color: '#6dc2f7', // COLORS.primary
        fontWeight: '800',
        letterSpacing: 0.3,
    }
    
});