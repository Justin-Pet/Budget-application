import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "../constants/GlobalStyles";
import { useLanguage } from "../store/context/LanguageContext";

const { height } = Dimensions.get("window");
function Language() {
  const { language, changeLanguage, translate } = useLanguage();
  const [currentLanguage, setCurrentLanguage] = useState("lt");

  /**
   * Set current language on component mount
   */
  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  /**
   * Change the language of the app and update the state of the component
   * @param {string} language - "lt" for Lithuanian, "en" for English
   */
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
              size={height * 0.025}
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
              size={height * 0.025}
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
    justifyContent: "flex-start",
  },

  languageOptionsContainer: {
    flexDirection: "row",
    paddingHorizontal: height * 0.03,
    paddingVertical: height * 0.02,
    marginVertical: height * 0.01,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.backGroundSecondary,
    justifyContent: "space-between",
    alignContent: "center",
  },
  mainText: {
    color: GlobalStyles.colors.headerColor,
    fontWeight: "bold",
    fontSize: height * 0.02,
  },

  pressed: {
    opacity: 0.75,
  },
  iconContainer: {
    justifyContent: "center",
    alignContent: "center",
  },
});
