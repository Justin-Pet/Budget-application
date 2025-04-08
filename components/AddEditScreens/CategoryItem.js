import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import { GlobalStyles } from "../../constants/GlobalStyles";

const { width, height } = Dimensions.get("window");
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
