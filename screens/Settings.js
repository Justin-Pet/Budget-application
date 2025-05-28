import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../constants/GlobalStyles";
import Language from "../components/Language";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";

import SettingsEntry from "../components/SettingsUI/SettingsEntry";
import { useLanguage } from "../store/context/LanguageContext";
import SettingsHeader from "../components/SettingsUI/SettingsHeader";
import { ExpenseEntriesContext } from "../store/context/ExpenseEntriesContext";
import { jsonToCSV } from "react-native-csv";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from "expo-file-system";
import Dialog from "react-native-dialog";
import { TextInput } from "react-native-gesture-handler";

const { height } = Dimensions.get("window");
const allowedChars = /^[a-zA-Z0-9]+$/;

/**
 * The Settings screen.
 *
 * This screen is accessible from the bottom tab bar and allows the user to
 * perform various settings-related actions, such as:
 *
 * - Changing the app's language
 * - Transferring money between wallets
 * - Managing reoccuring payments
 * - Exporting the app's data to a CSV file
 *
 * The screen is divided into sections, each with its own header and settings
 * entries. The settings entries are buttons that, when pressed, trigger the
 * corresponding action.
 */
function Settings() {
  const expensesCtx = useContext(ExpenseEntriesContext);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [filename, setFilename] = useState("");
  const { translate } = useLanguage();
  const navigator = useNavigation();

  /**
   * Handles the "Transfer between wallets" settings entry by navigating to the
   * "TransferBetweenWallets" screen, which allows the user to transfer money
   * between their wallets.
   */
  function handleTransferBetweenWallets() {
    navigator.navigate("TransferBetweenWallets");
  }

  /**
   * Handles the "Reoccuring payments" settings entry by navigating to the
   * "ReoccuringPayments" screen, which shows a list of all reoccuring payments.
   */
  function handleReoccuringScreen() {
    navigator.navigate("ReoccuringPayments");
  }

  /**
   * Saves the app's data to a CSV file in the Documents folder.
   *
   * This function requests access to the Documents folder, creates a new file in
   * it, and writes the CSV data to the file. If the file is saved successfully,
   * it shows an alert with a success message. If an error occurs, it shows an
   * alert with the error message.
   *
   * @returns {Promise<string>} The URI of the saved file, or undefined if an
   * error occurs.
   */
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

  /**
   * Shows the "Export to CSV" dialog, which allows the user to enter a filename
   * and save the app's data to a CSV file in the Documents folder.
   */
  function handleExportToCsvButton() {
    setIsDialogVisible(true);
  }

  /**
   * Confirms the "Export to CSV" dialog and saves the app's data to a CSV
   * file in the Documents folder. This function is called when the user
   * clicks the "Confirm" button in the dialog.
   */
  function handleDialogConfirm() {
    setIsDialogVisible(false);
    setFilename("");
    saveCSVToDocuments();
  }

  /**
   * Closes the "Export to CSV" dialog and clears the filename input.
   */
  function handleDialogCancel() {
    setFilename("");
    setIsDialogVisible(false);
  }

  /**
   * Validates the input string against allowed characters and updates
   * the filename state if valid.
   *
   * @param {string} input - The input string to validate and set as the filename.
   */

  /**
   * Validates the input string against allowed characters and updates
   * the filename state if valid.
   *
   * @param {string} input - The input string to validate and set as the filename.
   */
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
          <Dialog.Button
            label={translate("Cancel")}
            onPress={handleDialogCancel}
          />
          <Dialog.Button
            label={translate("Confirm")}
            onPress={handleDialogConfirm}
          />
        </Dialog.Container>
      </View>

      <View style={styles.itemContainer}>
        <SettingsHeader headerText={translate("language")} />
        <Language />
      </View>

      <View style={styles.itemContainer}>
        {/* <Text style={styles.headerText}>{translate("Wallets")}</Text> */}
        <SettingsHeader headerText={translate("Wallets")} />
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
    paddingTop: height * 0.06,
    backgroundColor: GlobalStyles.colors.backgroundMain,
  },
  itemContainer: {
    width: "80%",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: height * 0.03,
    textDecorationLine: "underline",
    color: GlobalStyles.colors.headerColor,
  },
});
