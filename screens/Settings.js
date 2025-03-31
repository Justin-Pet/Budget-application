import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/GlobalStyles";
import Language from "../components/Language";
import TransferBetweenWallets from "./TransferBetweenWallets";
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useContext, useState } from "react";
import SimpleButton from "../components/SimpleButton";
import SettingsEntry from "../components/SettingsUI/SettingsEntry";
import { useLanguage } from "../store/context/LanguageContext";
import SettingsHeader from "../components/SettingsUI/SettingsHeader";
import ExpenseEntriesContextProvider, {
  ExpenseEntriesContext,
} from "../store/context/ExpenseEntriesContext";
import { jsonToCSV } from "react-native-csv";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";


// import { StorageAccessFramework } from 'expo-file-system';

import Dialog from "react-native-dialog";
import { TextInput } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const allowedChars = /^[a-zA-Z0-9]+$/;

function Settings() {
  const expensesCtx = useContext(ExpenseEntriesContext);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [filename, setFilename] = useState("");
  const { translate } = useLanguage();
  const navigator = useNavigation();

  function handleTransferBetweenWallets() {
    navigator.navigate("TransferBetweenWallets");
  }

  function handleReoccuringScreen() {
    navigator.navigate("ReoccuringPayments");
  }

  const saveCSVToDocuments = async () => {
    const csv = expensesCtx.expenses;
    const fileName = filename + ".csv";

    const csvData = jsonToCSV(csv);

    try {
      // Request access to the Documents folder
      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!permissions.granted) {
        console.log("Permission not granted");
        return;
      }

      // Get the URI of the Documents folder
      const documentsFolderUri = permissions.directoryUri;

      // Create the file in the Documents folder
      const fileUri = await StorageAccessFramework.createFileAsync(
        documentsFolderUri,
        fileName,
        "text/csv"
      );

      // Write the CSV data to the file
      await FileSystem.writeAsStringAsync(fileUri, csvData);
      console.log("File saved successfully to:", fileUri);
      Alert.alert(translate("FileSaved"));

      return fileUri; // Return the file URI for further use (e.g., sharing)
    } catch (error) {
      console.error("Error saving file to Documents folder:", error);
      Alert.alert(translate("FileError"), error.message);
    }
  };

  function handleExportToCsvButton() {
    setIsDialogVisible(true);
  }

  function handleDialogConfirm() {
    setIsDialogVisible(false);
    setFilename("");
    saveCSVToDocuments();
  }

  function handleDialogCancel() {
    setFilename("");
    setIsDialogVisible(false);
  }

  function handleInput(input) {
    if (allowedChars.test(input)) {
      setFilename(input);
    }
  }



  return (
    <SafeAreaView style={styles.rootContainer}>
      <View>
        <Dialog.Container
          visible={isDialogVisible}
          onBackdropPress={() => setIsDialogVisible(false)}
        >
          <Dialog.Title>{translate("EnterFileName")}:</Dialog.Title>
          {/* <Dialog.Description>Enter file name:</Dialog.Description> */}
          <TextInput
            value={filename}
            onChangeText={handleInput}
            autoFocus={true}
          />
          <Dialog.Button label={translate("Cancel")} onPress={handleDialogCancel} />
          <Dialog.Button label={translate("Confirm")} onPress={handleDialogConfirm} />
        </Dialog.Container>
      </View>

      <View style={styles.itemContainer}>
        <SettingsHeader headerText={translate("language")} />
        <Language />
      </View>

      <View style={styles.itemContainer}>
        {/* <Text style={styles.headerText}>{translate("Wallets")}</Text> */}
        <SettingsHeader  headerText={translate("Wallets") } />
        <SettingsEntry
          onPress={handleTransferBetweenWallets}
          iconName="wallet"
          buttonText={translate("TransferBetweenWallets")}
        />
      </View>
      <View style={styles.itemContainer}>
        <SettingsHeader headerText={translate("OtherSettings")} />
        <SettingsEntry
          onPress={handleReoccuringScreen}
          iconName={"time"}
          buttonText={translate("ReoccuringPayments")}
        />
        {/* <SettingsEntry
          onPress={() => {}}
          buttonText={translate("AddExternalWallet")}
        /> */}
        <SettingsEntry
          onPress={handleExportToCsvButton}
          iconName={"download"}
          buttonText={translate("ExportToCsv")}
        />
    
      </View>
    </SafeAreaView>
  );
}

export default Settings;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: height > 800 ? 75 : 50,
    backgroundColor: GlobalStyles.colors.backgroundMain,
  },
  itemContainer: {

    width: "80%",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: width > 400 ? 30 : 23,
    textDecorationLine: "underline",
    color: GlobalStyles.colors.headerColor,
  },
});
