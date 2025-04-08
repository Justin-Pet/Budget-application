import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { useLanguage } from "../../store/context/LanguageContext";
import Ionicons from "@expo/vector-icons/Ionicons";


const { width, height } = Dimensions.get("window");

function SettingsEntry({ children, buttonText, onPress, iconName }) {
  const { translate } = useLanguage();
  return (

      <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
        <View style={styles.innerContainer}>
          <Text style={styles.mainText}>{buttonText}</Text>
          <View style={styles.iconContainer}>
              <Ionicons
                name= {iconName}
                size={height * 0.025}
                color={GlobalStyles.colors.iconColor}
              />
          </View>
        </View>
      </Pressable>

  );
}

export default SettingsEntry;

const styles = StyleSheet.create({

  innerContainer: {

    flexDirection: "row",
    paddingHorizontal: height * 0.03,
    paddingVertical: height * 0.02,
    marginVertical: height * 0.01,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.backGroundSecondary,
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
  },

  mainText: {
    color: GlobalStyles.colors.headerColor,
    fontWeight: "bold",
    fontSize: height * 0.02,
  },

  pressed: {
    opacity: 0.75,
  },

  iconContainer:{
    justifyContent: "center",
    alignContent: "center",
  },
});
