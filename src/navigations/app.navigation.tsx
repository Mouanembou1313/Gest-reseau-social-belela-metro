import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthNavigation } from "./auth.navigation";
import { TabNavigation } from "./tab.navigation";
import { OnboardingScreen } from "../screens/standalone/onboarding/onboarding.screen";

import { PostScreen } from "../screens/menu/post/post.screen";
import { LikeScreen } from "../screens/menu/notification/Like/like.screen";
import { CommentScreen } from "../screens/menu/notification/comment/comment.screen";
import { RequestScreen } from "../screens/menu/notification/request/request.screen";

export type AppStackParamList = {
  auth: undefined;
  onboarding: undefined;
  main: undefined;

  like: undefined;
  comment: undefined;
  request: undefined;
  Posts: { image?: string } | undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

export function AppNavigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] =
    useState<keyof AppStackParamList>("auth");

  useEffect(() => {
    checkUserToken();
  }, []);

  // Vérifie si l'utilisateur possède déjà un token JWT
  // const checkUserToken = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("token");

  //     // Si token existe, on démarre directement sur l'app principale
  //     setInitialRoute(token ? "main" : "auth");
  //   } catch {
  //     setInitialRoute("auth");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const checkUserToken = async () => {
    try {
      // TEMPORAIRE : on ignore le token pour toujours démarrer sur welcome
      setInitialRoute("auth");
    } catch {
      setInitialRoute("auth");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#6EC6FF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="auth">
          {(props) => (
            <AuthNavigation
              {...props}
              onLoginSuccess={() => {
                // Connexion normale : on va directement à Home via main
                props.navigation.replace("main");
              }}
              onRegisterSuccess={() => {
                // Inscription : on affiche d'abord l'onboarding
                props.navigation.replace("onboarding");
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="onboarding">
          {(props) => (
            <OnboardingScreen
              onFinish={() => {
                // Bouton "Commencer" : on ouvre l'application principale
                props.navigation.replace("main");
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="main" component={TabNavigation} />

        <Stack.Screen name="like" component={LikeScreen} />
        <Stack.Screen name="comment" component={CommentScreen} />
        <Stack.Screen name="request" component={RequestScreen} />
        <Stack.Screen name="Posts" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}