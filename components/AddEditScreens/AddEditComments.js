import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { useLanguage } from "../../store/context/LanguageContext";

const { width, height } = Dimensions.get("window");
function AddEditComments({ comment, setComment }) {
  const { translate } = useLanguage();
  return (
    <View style={styles.commentsContainer}>
      <TextInput
        keyboardType="default"
        placeholder={translate("comments")}
        placeholderTextColor={GlobalStyles.colors.textColor}
        value={comment}
        onChangeText={setComment}
        maxLength={25}
        style={styles.inputText}
        width="100%"
        textAlign="center"
      />
    </View>
  );
}

export default AddEditComments;

const styles = StyleSheet.create({
  commentsContainer: {
    borderBottomWidth: height > 800 ? 1 : 1,
    borderBottomColor: GlobalStyles.colors.backGroundSecondary,
    borderRadius: 10,
    marginVertical: height > 800 ? 8 : 5,

    color: "white",
    width: "60%",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    fontSize: height > 800 ? 15 : 12,
    color: GlobalStyles.colors.textColor,
  },
});
