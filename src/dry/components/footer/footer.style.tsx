import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#eef2f7',
        backgroundColor: '#ffffff',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    label: {
        fontSize: 11,
        color: '#65708a',
        marginTop: 2,
    },

    labelActive: {
        fontSize: 11,
        color: '#6dc2f7',
        marginTop: 2,
        fontWeight: '600',
    },accountBtn: {
    alignItems: "center",
    justifyContent: "center",
  },

  accountIcon: {
    marginBottom: 2,
  },

  accountText: {
    color: "#6dc2f7",
    fontSize: 12,
    textAlign: "center",
  },
});
