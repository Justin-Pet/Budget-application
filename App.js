import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GlobalStyles } from "./constants/GlobalStyles.js";
import { SafeAreaView } from "react-native-safe-area-context";

import RoundButton from "./components/RoundButton.js";
import Main from "./screens/Summary.js";
import Summary from "./screens/Summary.js";
import AllExpenses from "./screens/AllExpenses.js";
import RecentExpenses from "./screens/ExpenseStatistics.js";
import Tips from "./screens/Tips.js";

import AddExpense from "./screens/AddExpense.js";
import EditExpense from "./screens/EditExpense.js";
import Settings from "./screens/Settings.js";

// import NavBar from "./components/ui/NavBar.js";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExpenseEntriesProvider from "./store/context/ExpenseEntriesContext.js";
import { LanguageProvider } from "./store/context/LanguageContext.js";
import * as SplashScreen from 'expo-splash-screen';

import MainStackNavigator from "./components/MainStackNavigator.js";



export default function App() {

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000); // 1 second

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

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "red",
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  navBar: {
    flex: 1,
    width: "100%",
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  content: {
    width: "100%",
    height: "90%",
  },
  headerText: {
    color: "black",
    fontSize: 20,
    marginRight: 30,
  },
});
