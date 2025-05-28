import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguageContext = createContext();
/**
 * Applicaiton dictinary for LT and EN languages
 */
const LANGUAGES = {
  en: {
    statistics: "Statistics",
    summary: "Summary",
    allExpenses: "All Expenses",
    tips: "Tips",
    settings: "Settings",
    language: "Language",
    Groceries: "Groceries",
    Health: "Health",
    Bills: "Bills",
    Home: "Home",
    Car: "Car",
    Education: "Education",
    Other: "Other",
    Entertainment: "Entertainment",
    Family: "Family",
    Salary: "Salary",
    Gifts: "Gifts",
    Other_income: "Other Income",
    amount: "Amount",
    addExpense: "Add Expense",
    comments: "Comments",
    delete: "Delete",
    back: "Back",
    save: "Save",
    lastFive: "Last 5 Expenses",
    ExpenseDate: "Expense date:",
    All: "All",
    Month: "Month",
    Select_year: "Select year",
    Select_month: "Select month",
    January: "January",
    February: "February",
    March: "March",
    April: "April",
    May: "May",
    June: "June",
    July: "July",
    August: "August",
    September: "September",
    October: "October",
    November: "November",
    December: "December",
    income: "Income",
    expense: "Expenses",
    Total: "Total",
    ExpenseIncomeTrend: "Expense-Income Trend",
    ExpenseDistribution: "Expense Distribution",
    CurrentDate: "Current Date",
    AllTime: "All Time",
    CurrentMonth: "Current Month",
    TotalBalance: "Total Balance",
    Jan: "Jan",
    Feb: "Feb",
    Mar: "Mar",
    Apr: "Apr",
    May: "May",
    Jun: "Jun",
    Jul: "Jul",
    Aug: "Aug",
    Sep: "Sep",
    Oct: "Oct",
    Nov: "Nov",
    Dec: "Dec",
    CurrentMonthBalance: "Current Month Balance",
    MonthlyAverage: "Monthly Average",
    wallet: "Wallet",
    Wallets: "Wallets",
    WalletBalance: "Wallet Balance",
    CurrentWalletBalance: "Current Wallet Balance",
    bankWallet: "Bank account",
    WalletTransfer: "Wallet Transfer",
    TransferBetweenWallets: "Transfer between wallets",
    TransferFrom: "Transfer from",
    TransferTo: "Transfer to",
    Transfer: "Transfer",
    ReoccuringPayments: "Reoccuring payments",
    AddExternalWallet: "Add external wallet",
    ExportToCsv: "Export to CSV",
    OtherSettings: "Other settings",
    AlertAmount: "Please enter amount",
    NextDueDate: "Next due date",
    FileSaved: "File saved",
    FileError: "Error, file not saved",
    EnterFileName: "Enter file name",
    Cancel: "Cancel",
    Confirm: "Confirm",
    ReoccuringPayment: "Reoccuring payment",
    CashWallet: "Cash wallet",
    bankWallet: "Bank account",
    WalletUsed: "Wallet used",
    Cash: "Cash",
    BankAccount: "Bank account",
    MonthlyBalance: "Monthly balance",
    TotalExpenseAmount: "Total expense amount",
    TotalIncomeAmount: "Total income amount",
    TotalBalance: "Total balance",
    ExpenseAmountPerMonth: "Expense amount per month",
    IncomeAmountPerMonth: "Income amount per month",
    AverageMonthlyBalance: "Average monthly balance",
    NoDataAvailable: "No data available",
    DataEntryError: "Please enter a category and amount",

  },
  lt: {
    statistics: "Statistika",
    summary: "Suvestinė",
    allExpenses: "Visos išlaidos",
    tips: "Patarimai",
    settings: "Nustatymai",
    language: "Kalba",
    Groceries: "Maistas",
    Health: "Sveikata",
    Bills: "Sąskaitos",
    Home: "Namai",
    Car: "Automobilis",
    Education: "Studijos",
    Other: "Kita",
    Entertainment: "Pramogos",
    Family: "Šeima",
    Salary: "Atlyginimas",
    Gifts: "Dovanos",
    Other_income: "Kitos pajamos",
    amount: "Suma",
    addExpense: "Prideti išlaidas",
    comments: "Komentarai",
    delete: "Ištrinti",
    back: "Atgal",
    save: "Išsaugoti",
    lastFive: "Paskutinės 5 išlaidos",
    ExpenseDate: "Išlaidų data:",
    All: "Visi",
    Month: "Mėnuo",
    Select_year: "Metai",
    Select_month: "Mėnuo",
    January: "Sausis",
    February: "Vasaris",
    March: "Kovas",
    April: "Balandis",
    May: "Gegužė",
    June: "Birželis",
    July: "Liepa",
    August: "Rugpjūtis",
    September: "Rugsėjis",
    October: "Spalis",
    November: "Lapkritis",
    December: "Gruodis",
    income: "Pajamos",
    expense: "Išlaidos",
    Total: "Iš viso",
    ExpenseIncomeTrend: "Išlaidu-pajamų diagrama",
    ExpenseDistribution: "Išlaidu pasiskirstymas",
    CurrentDate: "Dabar",
    AllTime: "Visas laikas",
    CurrentMonth: "Šis mėnuo",
    TotalBalance: "Bendras balansas",
    Jan: "Sau",
    Feb: "Vas",
    Mar: "Kov",
    Apr: "Bal",
    May: "Geg",
    Jun: "Bir",
    Jul: "Lie",
    Aug: "Rug",
    Sep: "Rgs",
    Oct: "Spa",
    Nov: "Lap",
    Dec: "Gru",
    CurrentMonthBalance: "Šio menesio balansas",
    MonthlyAverage: "Menesinis vidurkis",
    wallet: "Piniginė",
    Wallets: "Piniginės",
    eWallet: "ePiniginė",
    WalletBalance: "Piniginės likutis",

    bankWallet: "Banko sąskaita",
    WalletTransfer: "Perkėlimas tarp piniginių",
    TransferBetweenWallets: "Lešų perkėlimas tarp piniginių",
    TransferFrom: "Perkelti iš",
    TransferTo: "Perkelti į",
    Transfer: "Perkelti",
    ReoccuringPayments: "Pasikartojantys mokėjimai",
    AddExternalWallet: "Pridėti papildomą piniginę",
    ExportToCsv: "Eksportuoti į CSV failą",
    OtherSettings: "Kiti nustatymai",
    AlertAmount: "Įveskite sumą",
    NextDueDate: "Kitas mokėjimas",
    FileSaved: "Failas išsaugotas",
    FileError: "Klaida, failas neišsaugotas",
    EnterFileName: "Įveskite failo pavadinimą",
    Cancel: "Atšaukti",
    Confirm: "Patvirtinti",
    ReoccuringPayment: "Pasikartojantis mokėjimas",
    CurrentWalletBalance: "Piniginių likučiai",
    CashWallet: "Piniginė",
    BankWallet: "Banko sąskaita",
    WalletUsed: "Naudota piniginė",
    Cash: "Grynųjų",
    Bank: "Banko sąskaita",
    MonthlyBalance: "Mėnesio balansas",
    TotalExpenseAmount: "Iš viso turėtą išlaidų",
    TotalIncomeAmount: "Iš viso gauta įplaukų",
    TotalBalance: "Bendras balansas",
    ExpenseAmountPerMonth: "Vidutinės išlaidos per mėnesį",
    IncomeAmountPerMonth: "Vidutinės įplaukos per mėnesį",
    AverageMonthlyBalance: "Vidutinis mėnesinis balansas",
    NoDataAvailable: "Nėra duomenų",
    DataEntryError: "Įveskite kategoriją ir sumą",

  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("lt");

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error("Error loading language", error);
    }
  };

  const changeLanguage = async (lang) => {
    setLanguage(lang);
    try {
      await AsyncStorage.setItem("language", lang);
    } catch (error) {
      console.error("Error saving language", error);
    }
  };

  const translate = (key) => {
    return LANGUAGES[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
