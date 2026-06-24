import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { WelcomeScreen } from "../screens/standalone/welcom/welcom.screen";
import { LoginScreen } from "../screens/standalone/login/login.screen";
import { RegisterScreen } from "../screens/standalone/register/register.screen";

export type AuthStackParamList = {
  welcome: undefined;
  signin: undefined;
  signup: undefined;
};

type AuthNavigationProps = {
  onLoginSuccess: () => void;
  onRegisterSuccess: () => void;
};

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthNavigation({
  onLoginSuccess,
  onRegisterSuccess,
}: AuthNavigationProps) {
  return (
    <Stack.Navigator
      initialRouteName="welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="welcome" component={WelcomeScreen} />

      <Stack.Screen name="signin">
        {(props) => (
          <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />
        )}
      </Stack.Screen>

      <Stack.Screen name="signup">
        {(props) => (
          <RegisterScreen {...props} onRegisterSuccess={onRegisterSuccess} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}