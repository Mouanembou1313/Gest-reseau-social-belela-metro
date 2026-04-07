import React from 'react'
import { View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { FooterComponent } from '../dry/components/footer/footer.component'
import HomeScreen from '../screens/menu/home/home.screen'
import { PostScreen } from '../screens/menu/post/post.screen'
import { AccountScreen } from '../screens/menu/account/account.screen'
import { SearchScreen } from '../screens/menu/search/search.component';
import { NotificationScreen } from '../screens/menu/notification/notification.screen';

const Stack = createStackNavigator()

export function TabNavigation({ navigation }: { navigation: any }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Stack.Navigator
                    initialRouteName={"home"}
                    screenOptions={{ headerShown: false }}
                >
                    {/* TAB PRINCIPAL */}
                    <Stack.Screen name="home" component={HomeScreen} />
                    <Stack.Screen name="post" component={PostScreen} />
                    <Stack.Screen name="account" component={AccountScreen} />
                    {/* 🔥 MENU DRAWER NAVIGATION */}
                    <Stack.Screen name="notification" component={NotificationScreen} />
                    <Stack.Screen name="search" component={SearchScreen} />

                </Stack.Navigator>
            </View>

            <FooterComponent navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f4f7',
    },
    content: {
        flex: 1,
    },
})
