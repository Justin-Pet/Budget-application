import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "../constants/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useLanguage } from "../store/context/LanguageContext";

const { width, height } = Dimensions.get("window");
function Language() {
  const { language, changeLanguage, translate } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState("lt");

  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  function handleChangeLanguage(language) {
    changeLanguage(language);
    setCurrentLanguage(language);
  }

  return (
    <View style={styles.rootContainer}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={handleChangeLanguage.bind(this, "lt")}
      >
        <View style={styles.languageOptionsContainer}>
          <Text style={styles.mainText}>Lietuvių</Text>
          <View style={styles.iconContainer}>
            <Ionicons
              name={currentLanguage === "lt" ? "ellipse" : "ellipse-outline"}
              size={22}
              color={GlobalStyles.colors.iconColor}
            />
          </View>
        </View>
      </Pressable>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={handleChangeLanguage.bind(this, "en")}
      >
        <View style={styles.languageOptionsContainer}>
          <Text style={styles.mainText}>English</Text>

          <View style={styles.iconContainer}>
            <Ionicons
              name={currentLanguage === "en" ? "ellipse" : "ellipse-outline"}
              size={22}
              color={GlobalStyles.colors.iconColor}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default Language;

const styles = StyleSheet.create({
  rootContainer: {
    // width: "80%",
    // flex: 1,
    justifyContent: "flex-start",
  },

  languageOptionsContainer: {
    flexDirection: "row",
    paddingHorizontal: width > 300 ? 30 : 20,
    paddingVertical: height > 800 ? 15 : 10,
    marginVertical: height > 800 ? 10 : 5,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.backGroundSecondary,
    justifyContent: "space-between",
    alignContent: "center",
  },
  mainText: {
    color: GlobalStyles.colors.headerColor,
    fontWeight: "bold",
    fontSize: width > 400 ? 17 : 15,
  },

  pressed: {
    opacity: 0.75,
  },
  iconContainer: {
    justifyContent: "center",
    alignContent: "center",
  },
});
