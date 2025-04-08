import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useState, useEffect } from "react";
import { tipsListEn, tipsListLt } from "../constants/TipsList";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GlobalStyles } from "../constants/GlobalStyles";
import { Dimensions } from "react-native";
import RoundButton from "../components/RoundButton";
import { useLanguage } from "../store/context/LanguageContext";

const { width, height } = Dimensions.get("window");

function Tips() {
  const { language } = useLanguage();
  const [tipsList, setTipsList] = useState(
    language === "lt" ? tipsListLt : tipsListEn
  );
  const [currentHeader, setCurrentHeader] = useState(tipsList[0][0]);
  const [currentTip, setCurrentTip] = useState(tipsList[0][1]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
          <Ionicons name="arrow-back" size={height * 0.05} color= {GlobalStyles.colors.iconColor} />
        </Pressable>
        <Pressable onPress={nextTipHandler}>
          <Ionicons name="arrow-forward" size={height * 0.05} color={GlobalStyles.colors.iconColor} />
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
