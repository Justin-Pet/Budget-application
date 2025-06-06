import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { GlobalStyles } from "../constants/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "../store/context/LanguageContext";

import AddExpense from "../screens/AddExpense";
import EditExpense from "../screens/EditExpense";
import Settings from "../screens/Settings";
import Summary from "../screens/Summary";
import AllExpenses from "../screens/AllExpenses";
import ExpenseStatistics from "../screens/ExpenseStatistics";
import Tips from "../screens/Tips";
import { Dimensions } from "react-native";
import TransferBetweenWallets from "../screens/TransferBetweenWallets";
import ReoccuringPayments from "../screens/ReoccuringPayments";

const { width, height } = Dimensions.get("window");

/**
 * A stack navigator that contains a bottom tab navigator with the main
 * features of the app.
 *
 * The bottom tab navigator contains the following screens:
 * - Tips: A screen that displays tips and tricks for managing expenses.
 * - All Expenses: A screen that displays all expenses.
 * - Summary: A screen that displays a summary of the user's expenses.
 * - Statistics: A screen that displays statistics about the user's expenses.
 * - Settings: A screen that allows the user to change the app's settings.
 *
 * The stack navigator also contains the following screens:
 * - AddExpense: A screen that allows the user to add a new expense.
 * - EditExpense: A screen that allows the user to edit an existing expense.
 * - TransferBetweenWallets: A screen that allows the user to transfer money
 *   between wallets.
 * - ReoccuringPayments: A screen that displays a list of reoccuring payments.
 */
function MainStackNavigator() {
  const Stack = createStackNavigator();
  const BottomNav = createBottomTabNavigator();
  const { translate } = useLanguage();

  /**
   * A bottom tab navigator that contains the main features of the app.
   *
   * The bottom tab navigator contains the following screens:
   * - Tips: A screen that displays tips and tricks for managing expenses.
   * - All Expenses: A screen that displays all expenses.
   * - Summary: A screen that displays a summary of the user's expenses.
   * - Statistics: A screen that displays statistics about the user's expenses.
   * - Settings: A screen that allows the user to change the app's settings.
   *
   * The bottom tab navigator also sets up the appearance of the tab bar.
   */
  function BottomOptions() {
    return (
      <BottomNav.Navigator
        screenOptions={{
          headerShown: false,

          tabBarStyle: {
            backgroundColor: GlobalStyles.colors.tabBarColor,
          },
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontSize: height * 0.011,
          },
          tabBarActiveTintColor: GlobalStyles.colors.tabBarActive,
          tabBarInactiveTintColor: GlobalStyles.colors.tabBarInactive,
        }}
        initialRouteName="Summary"
      >
        <BottomNav.Screen
          name="Tips"
          component={Tips}
          options={{
            // headerShown: false,
            title: "Tips",
            tabBarLabel: translate("tips"),

            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name={focused ? "star" : "star-outline"}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />

        <BottomNav.Screen
          name="All Expenses"
          component={AllExpenses}
          options={{
            // headerShown: false,
            title: "All expenses",
            tabBarLabel: translate("allExpenses"),
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name={focused ? "list" : "list-outline"}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <BottomNav.Screen
          name="Summary"
          component={Summary}
          options={{
            title: "Summary",
            tabBarLabel: translate("summary"),
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <BottomNav.Screen
          name="Statistics"
          component={ExpenseStatistics}
          options={{
            // headerShown: false,
            title: "Statistics",
            tabBarLabel: translate("statistics"),
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name={focused ? "star" : "star-outline"}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <BottomNav.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
            title: "Settings",
            tabBarLabel: translate("settings"),
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Ionicons
                  name={focused ? "star" : "star-outline"}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      </BottomNav.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomOptions}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="ManageExpenses" component={ManageExpenses} /> */}
      <Stack.Screen name="Tips" component={Tips} />
      <Stack.Screen
        name="AddExpense"
        component={AddExpense}
        options={{
          headerShown: true,

          headerTitle: translate("back"),

          headerTintColor: GlobalStyles.colors.headerColor,
          headerTitleStyle: {
            // fontSize: height * 0.02,
          },
          headerStyle: {
            backgroundColor: GlobalStyles.colors.backgroundMain,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="EditExpense"
        component={EditExpense}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: translate("back"),
          headerTintColor: GlobalStyles.colors.headerColor,
          headerStyle: {
            backgroundColor: GlobalStyles.colors.backgroundMain,
          },
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="TransferBetweenWallets"
        component={TransferBetweenWallets}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: translate("back"),
          headerTintColor: GlobalStyles.colors.headerColor,
          headerStyle: {
            backgroundColor: GlobalStyles.colors.backgroundMain,
          },
          headerShadowVisible: false,
        })}
      />

      <Stack.Screen
        name="ReoccuringPayments"
        component={ReoccuringPayments}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: translate("back"),
          headerTintColor: GlobalStyles.colors.headerColor,
          headerStyle: {
            backgroundColor: GlobalStyles.colors.backgroundMain,
          },
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
