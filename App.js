import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import ExpenseEntriesProvider from "./store/context/ExpenseEntriesContext.js";
import { LanguageProvider } from "./store/context/LanguageContext.js";
import * as SplashScreen from "expo-splash-screen";
import MainStackNavigator from "./components/MainStackNavigator.js";

export default function App() {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000); // 1 second splash screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <LanguageProvider>
        <ExpenseEntriesProvider>
          <NavigationContainer>
            <MainStackNavigator />
          </NavigationContainer>
        </ExpenseEntriesProvider>
      </LanguageProvider>
    </>
  );
}
