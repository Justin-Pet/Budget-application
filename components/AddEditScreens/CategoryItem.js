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
function CategoryItem({ currentCategory, sendToParent, imageUrl, cat, itemType }) {
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


function getImageContainerWidthHeight(){
  if (height > 950) {
    return 90;
  }
  else if (height > 800) {
    return 70;
  }
  else {
    return 55;
  }
}

function getImageWidthHeight(){
  if (height > 950) {
    return 50;
  }
  else if (height > 800) {
    return 40;
  }
  else {
    return 35;
  }
}

export default CategoryItem;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: GlobalStyles.colors.primary100,
    alignContent: "center",
    borderRadius: 50,
    width: getImageContainerWidthHeight(),
    height: getImageContainerWidthHeight(),
    marginHorizontal: width > 400 ? 10 : 7,
    marginVertical: width > 400 ? 10 : 7,
    borderWidth: height > 800 ? 2 : 1,
    borderWidth: 0,

    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: getImageWidthHeight(),
    height: getImageWidthHeight(),
  },
});
