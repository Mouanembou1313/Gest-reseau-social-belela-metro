import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export function FooterComponent({ navigation }: { navigation: any }) {
    const handleHome = () => {

        navigation.navigate('main', {
            screen: 'home', // ← ou le nom exact de ta tab (ex: 'Home', 'Reservation', etc.)
        });
    }
    const handlePost = () => {

        navigation.navigate('main', {
            screen: 'post', // ← ou le nom exact de ta tab (ex: 'Home', 'Reservation', etc.)
        });
    }
    const handleAccount = () => {

        navigation.navigate('main', {
            screen: 'account', // ← ou le nom exact de ta tab (ex: 'Home', 'Reservation', etc.)
        });
    }
    return (
        <View style={styles.container}>
            {/* HOME */}
            <TouchableOpacity onPress={handleHome} style={{
                alignItems: "center",
                justifyContent: "center"
            }}>
                <MaterialIcons
                    name={"home"}
                    size={24}
                    color={'#6dc2f7'}
                />
                <Text style={{ color: "#6dc2f7", fontSize: 12, textAlign: "center" }}>Acceuil</Text>
            </TouchableOpacity>

            {/* POST */}
            <TouchableOpacity onPress={handlePost} style={{
                alignItems: "center",
                justifyContent: "center"
            }}>
                <MaterialIcons
                    name={"add-circle-outline"}
                    size={24}
                    color={'#6dc2f7'}

                />            <Text style={{
                    color: "#6dc2f7",
                    fontSize: 12,
                    textAlign: "center",
                    marginTop: 2
                }}>Poste</Text>
            </TouchableOpacity>

            {/* ACCOUNT */}
            <TouchableOpacity onPress={handleAccount} style={{
                alignItems: "center",
                justifyContent: "center"
            }} >
                <MaterialIcons
                    name={"person-outline"}
                    size={20}
                    color={'#6dc2f7'}
                />
                <Text style={{
                    color: "#6dc2f7", fontSize: 12, textAlign: "center",
                    marginTop: 2
                }}>Compte</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#e5e7eb',
    },
})
