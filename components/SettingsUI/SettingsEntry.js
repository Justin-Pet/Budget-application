import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { useLanguage } from "../../store/context/LanguageContext";
import Ionicons from "@expo/vector-icons/Ionicons";

const { height } = Dimensions.get("window");

/**
 * SettingsEntry - A component that renders a pressable settings entry with an icon and text.
 *                 It uses the Ionicons library for the icon and supports custom text and
 *                 press handling behavior.
 *
 * @param {Object} props - The props for the component.
 * @param {React.ReactNode} props.children - The children elements to render inside the component.
 * @param {string} props.buttonText - The text to display on the button.
 * @param {function} props.onPress - The function to call when the button is pressed.
 * @param {string} props.iconName - The name of the Ionicons icon to display.
 */

function SettingsEntry({ children, buttonText, onPress, iconName }) {
  const { translate } = useLanguage();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.mainText}>{buttonText}</Text>
        <View style={styles.iconContainer}>
          <Ionicons
            name={iconName}
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

  iconContainer: {
    justifyContent: "center",
    alignContent: "center",
  },
});
