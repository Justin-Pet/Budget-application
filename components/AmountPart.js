import { Text, View, StyleSheet, Pressable, Dimensions } from "react-native";
import { GlobalStyles } from "../constants/GlobalStyles";

const { width, height } = Dimensions.get("window");
function AmountPart({ amount, text, containerStyle }) {
  return (
    <View style={[styles.rootContainer, containerStyle]}>
      <Pressable>
        <Text style={styles.amountContainer}>{"\u20AC"}{amount}</Text>
      </Pressable>
      <Text style={[styles.amountContainer, styles.textStyle]}>{text}</Text>
    </View>
  );
}

function getFontSize(){
  if (height > 950) {
    return 50;
  }
  else if (height > 800) {
    return 40;
  }
  else {
    return 25;
    
  }
}

export default AmountPart;

const styles = StyleSheet.create({
  rootContainer: {
    // borderBottomWidth: 2,
    borderRadius: 20,
    backgroundColor: GlobalStyles.colors.accentColor2,

  },
  amountContainer: {
    color: GlobalStyles.colors.headerColor,
    // fontSize: height > 800 ? 50 : 35,
    fontSize: getFontSize(),
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle: { 
    fontSize: height > 800 ? 20 : 15, 
    marginVertical: height > 800 ? 8 : 5,},
});
