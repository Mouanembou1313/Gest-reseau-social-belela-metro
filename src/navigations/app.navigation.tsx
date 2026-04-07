import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { PostScreen } from '../screens/menu/post/post.screen';
import { TabNavigation } from './tab.navigation';

import { LikeScreen } from '../screens/menu/notification/Like/like.screen';
import { CommentScreen } from '../screens/menu/notification/comment/comment.screen';
import { RequestScreen } from '../screens/menu/notification/request/request.screen';

import { AuthNavigation } from './auth.navigation'; // ✅ AJOUT

export type AppStackParamList = {
  auth: undefined;
  main: undefined;

  like: undefined;
  comment: undefined;
  request: undefined;
  Posts: { image?: string } | undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

export function AppNavigation() {

  const isLoggedIn = false; // 🔥 TEMPORAIRE

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* 🔥 AUTH FIRST */}
        {!isLoggedIn ? (
          <Stack.Screen name="auth" component={AuthNavigation} />
        ) : (
          <>
            <Stack.Screen name="main" component={TabNavigation} />

            <Stack.Screen name="like" component={LikeScreen} />
            <Stack.Screen name="comment" component={CommentScreen} />
            <Stack.Screen name="request" component={RequestScreen} />
            <Stack.Screen name="Posts" component={PostScreen} />
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}