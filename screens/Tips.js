import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { tipsListEn, tipsListLt } from "../constants/TipsList";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "../constants/GlobalStyles";
import { Dimensions } from "react-native";
import { useLanguage } from "../store/context/LanguageContext";

const { height } = Dimensions.get("window");

/**
 * Component that displays a series of tips with the ability to navigate
 * through them. The tips are displayed based on the currently selected
 * language. Users can navigate to the next or previous tip using the
 * provided buttons.
 *
 * State:
 * - tipsList: List of tips based on the selected language.
 * - currentHeader: The header/title of the current tip.
 * - currentTip: The content of the current tip.
 * - currentIndex: Index of the currently displayed tip in tipsList.
 *
 * Functions:
 * - nextTipHandler: Advances to the next tip in the list, or loops back to the
 *   first tip if currently at the last.
 * - previousTipHandler: Moves to the previous tip, or loops to the last tip if
 *   currently at the first.
 */

function Tips() {
  const { language } = useLanguage();

  /**
   * Sets the list of tips based on the selected language.
   */
  const [tipsList, setTipsList] = useState(
    language === "lt" ? tipsListLt : tipsListEn
  );
  const [currentHeader, setCurrentHeader] = useState(tipsList[0][0]);
  const [currentTip, setCurrentTip] = useState(tipsList[0][1]);
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * Advances to the next tip in the list, or loops back to the
   * first tip if currently at the last.
   */
  function nextTipHandler() {
    if (currentIndex < tipsList.length - 1) {
      setCurrentHeader(tipsList[currentIndex + 1][0]);
      setCurrentTip(tipsList[currentIndex + 1][1]);
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentHeader(tipsList[0][0]);
      setCurrentTip(tipsList[0][1]);
      setCurrentIndex(0);
    }
  }

  /**
   * Moves to the previous tip, or loops to the last tip if
   * currently at the first.
   */
  function previousTipHandler() {
    if (currentIndex > 0) {
      setCurrentHeader(tipsList[currentIndex - 1][0]);
      setCurrentTip(tipsList[currentIndex - 1][1]);
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentHeader(tipsList[tipsList.length - 1][0]);
      setCurrentTip(tipsList[tipsList.length - 1][1]);
      setCurrentIndex(tipsList.length - 1);
    }
  }

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{currentHeader}</Text>
        <Text style={styles.text}>{currentTip}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable onPress={previousTipHandler}>
          <Ionicons
            name="arrow-back"
            size={height * 0.05}
            color={GlobalStyles.colors.iconColor}
          />
        </Pressable>
        <Pressable onPress={nextTipHandler}>
          <Ionicons
            name="arrow-forward"
            size={height * 0.05}
            color={GlobalStyles.colors.iconColor}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default Tips;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: GlobalStyles.colors.backgroundMain,
    paddingVertical: height * 0.05,
    paddingHorizontal: height * 0.025,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "flex-end",
  },
  header: {
    fontWeight: "bold",
    color: GlobalStyles.colors.headerColor,
    fontSize: height * 0.05,
    textAlign: "left",
    textDecorationLine: "underline",
  },
  text: {
    color: GlobalStyles.colors.headerColor,
    marginVertical: height * 0.03,
    fontSize: height * 0.025,
    textAlign: "justify",
  },
});
