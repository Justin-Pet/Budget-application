import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";
import { useLanguage } from "../../store/context/LanguageContext";

const { height } = Dimensions.get("window");
/**
 * A component that renders a text input for user comments.
 *
 * @param {{comment: string, setComment: function}} props - The props for the component.
 * @param {string} props.comment - The current comment text.
 * @param {function} props.setComment - The function to call when the comment text changes.
 *
 * @returns {React.ReactNode} - The rendered component.
 */
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
    borderBottomWidth: height * 0.001,
    borderBottomColor: GlobalStyles.colors.backGroundSecondary,
    borderRadius: 10,
    marginVertical: height * 0.015,

    color: "white",
    width: "60%",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    fontSize: height * 0.015,
    color: GlobalStyles.colors.textColor,
  },
});
