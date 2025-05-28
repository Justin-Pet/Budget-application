import { View, StyleSheet, Pressable, Image, Dimensions } from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";

const { height } = Dimensions.get("window");
/**
 * A single category item displayed in the category selection list.
 * Pressing on the item will call the provided sendToParent function with the
 * category name and type as arguments.
 *
 * @param {string} currentCategory - The category currently selected.
 * @param {function(string, string)} sendToParent - The function to call when
 * the item is pressed.
 * @param {ImageSourcePropType} imageUrl - The image to display for the category.
 * @param {string} cat - The name of the category.
 * @param {string} itemType - The type of the category, either "expense" or "income".
 */
function CategoryItem({
  currentCategory,
  sendToParent,
  imageUrl,
  cat,
  itemType,
}) {
  return (
    <View
      style={styles.imageContainer}
      backgroundColor={
        currentCategory === cat
          ? GlobalStyles.colors.backGroundSecondary
          : GlobalStyles.colors.backGroundSecondaryInactive
      }
    >
      <Pressable onPress={sendToParent.bind(this, cat, itemType)}>
        <Image style={styles.image} source={imageUrl} />
      </Pressable>
    </View>
  );
}

export default CategoryItem;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: GlobalStyles.colors.primary100,
    alignContent: "center",
    borderRadius: 50,
    width: height * 0.1,
    height: height * 0.1,
    marginHorizontal: height * 0.01,
    marginVertical: height * 0.01,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.backGroundSecondary,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: height * 0.045,
    height: height * 0.045,
  },
});
