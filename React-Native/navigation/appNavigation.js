import { View, Text } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SplashScreen from "../screens/SplashScreen";

import { AuthContext } from "../context/AuthContext";
import FormScreen from "../screens/FormScreen";
import EditFormScreen from "../screens/EditFormScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { userInfo, splashLoading } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : userInfo ? (
          <>
            <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="AddTask"
              options={{ headerShown: false }}
              component={FormScreen}
            />
            <Stack.Screen
              name="EditTask"
              options={{ headerShown: false }}
              component={EditFormScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              options={{ headerShown: false }}
              component={WelcomeScreen}
            />
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen
              name="SignUp"
              options={{ headerShown: false }}
              component={SignUpScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
