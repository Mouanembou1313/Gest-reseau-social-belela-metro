import React from 'react';
import { StatusBar } from 'react-native';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { FooterComponent } from '../dry/components/footer/footer.component';
import HomeScreen from '../screens/menu/home/home.screen';
import { PostScreen } from '../screens/menu/post/post.screen';
import { AccountScreen } from '../screens/menu/account/account.screen';
import { SearchScreen } from '../screens/menu/search/search.component';
import { NotificationScreen } from '../screens/menu/notification/notification.screen';

export type MainTabParamList = {
  home: undefined;
  post: undefined;
  account: undefined;
  search: undefined;
  notification: undefined;
};
const Tabs = createBottomTabNavigator<MainTabParamList>();

// tabBar est un callback de rendu : les hooks restent dans le composant React.
function renderFooter(props: BottomTabBarProps) {
  return <FooterComponent {...props} />;
}

export function TabNavigation() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Tabs.Navigator
        initialRouteName="home"
        backBehavior="history"
        tabBar={renderFooter}
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: '#f6f9fc' },
        }}
      >
        <Tabs.Screen
          name="home"
          component={HomeScreen}
          options={{ title: 'Accueil' }}
        />
        <Tabs.Screen
          name="post"
          component={PostScreen}
          options={{ title: 'Publier' }}
        />
        <Tabs.Screen
          name="account"
          component={AccountScreen}
          options={{ title: 'Compte' }}
        />
        <Tabs.Screen name="search" component={SearchScreen} />
        <Tabs.Screen name="notification" component={NotificationScreen} />
      </Tabs.Navigator>
    </>
  );
}
