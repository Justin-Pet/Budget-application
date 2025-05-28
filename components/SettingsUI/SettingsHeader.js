import { View, Text, StyleSheet, Dimensions } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
const {  height } = Dimensions.get("window");
/**
 * Renders a header for the settings screen.
 * @param {{headerText: string}} props
 * @prop {string} headerText - The text to display in the header.
 */
function SettingsHeader({ headerText }) {
  return <Text style={styles.headerText}>{headerText}</Text>;
}

export default SettingsHeader;

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "bold",
    fontSize: height * 0.035,
    paddingTop: height * 0.015,
    textDecorationLine: "underline",
    color: GlobalStyles.colors.headerColor,
  },
});
