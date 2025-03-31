import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const ExpenseEntriesContext = createContext({
  expenses: [],
  reoccuringExpenses: [],
  wallet: "",
  bankWallet: "",
  reoccuringExpenses: [],

  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
  addReoccuringExpense: () => {},
  processPendingExpenses: () => {},
  removeReoccuringExpense: () => {},
});

function ExpenseEntriesContextProvider({ children }) {
  let [idCounter, setIdCounter] = useState(1);
  let [reoccuringIdCounter, setReoccuringIdCounter] = useState(1);
  let [reoccuringExpenses, setReoccuringExpenses] = useState([]);
  let [expenses, setExpenses] = useState([]);
  let [wallet, setWallet] = useState(0);
  let [bankWallet, setBankWallet] = useState(0);

  const storeIdCounter = async (value) => {
    try {
      await AsyncStorage.setItem("idCounter", value.toString());
    } catch (error) {
      console.warn(error);
    }
  };

  const storeReoccuringIdCounter = async (value) => {
    try {
      await AsyncStorage.setItem("reoccuringIdCounter", value.toString());
    } catch (error) {
      console.warn(error);
    }
  };

  const storeWallet = async (value) => {
    try {
      await AsyncStorage.setItem("wallet", value.toString());
    } catch (error) {
      console.warn(error);
    }
  };

  const storeBankWallet = async (value) => {
    try {
      await AsyncStorage.setItem("bankWallet", value.toString());
    } catch (error) {
      console.warn(error);
    }
  };

  const storeExpenses = async (value) => {
    try {
      const serializedExpenses = value.map((expense) => ({
        ...expense,
        date: expense.date.toISOString(),
      }));
      await AsyncStorage.setItem(
        "expenses",
        JSON.stringify(serializedExpenses)
      );
    } catch (error) {
      console.warn(error);
    }
  };

  const storeReoccuringExpenses = async (value) => {
    try {
      const serializedExpenses = value.map((expense) => ({
        ...expense,
        date: expense.date.toISOString(),
      }));
      await AsyncStorage.setItem(
        "reoccuringExpenses",
        JSON.stringify(serializedExpenses)
      );
    } catch (error) {
      console.warn(error);
    }
  };

  const loadIdCounter = async () => {
    try {
      const value = await AsyncStorage.getItem("idCounter");
      return value ? parseInt(value) : 1;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  };

  const loadReoccuringIdCounter = async () => {
    try {
      const value = await AsyncStorage.getItem("reoccuringIdCounter");
      return value ? parseInt(value) : 1;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  };
  const loadWallet = async () => {
    try {
      const value = await AsyncStorage.getItem("wallet");
      return value ? parseInt(value) : 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  };

  const loadBankWallet = async () => {
    try {
      const value = await AsyncStorage.getItem("bankWallet");
      return value ? parseInt(value) : 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  };

  const loadExpenses = async () => {
    try {
      const value = await AsyncStorage.getItem("expenses");
      if (value) {
        const parsedExpenses = JSON.parse(value);
        return parsedExpenses.map((expense) => ({
          ...expense,
          date: new Date(expense.date),
        }));
      }
      return [];
    } catch (error) {
      console.warn(error);
      return [];
    }
  };

  const loadReoccuringExpenses = async () => {
    try {
      const value = await AsyncStorage.getItem("reoccuringExpenses");
      if (value) {
        const parsedExpenses = JSON.parse(value);

        return parsedExpenses.map((expense) => ({
          ...expense,
          date: new Date(expense.date),
          dueDay: new Date(expense.dueDay),
        }));
      }
      return [];
    } catch (error) {
      console.warn(error);
      return [];
    }
  };

  const clearAsyncStorageData = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage data cleared successfully");
      setReoccuringExpenses([]);
      setExpenses([]);
      setWallet(0);
      setBankWallet(0);
      setIdCounter(1);
      setReoccuringIdCounter(1);
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  useEffect(() => {
    // clearAsyncStorageData();

    loadIdCounter().then((value) => setIdCounter(value));
    loadExpenses().then((value) => setExpenses(value));
    loadReoccuringIdCounter().then((value) => setReoccuringIdCounter(value));
    loadReoccuringExpenses().then((value) => setReoccuringExpenses(value));
    loadWallet().then((value) => setWallet(value));
    loadBankWallet().then((value) => setBankWallet(value));
  }, []);

  function addExpense(description, date, amount, comment, type, wallet) {
    setExpenses((prevExpenses) => {
      const newId =
        (prevExpenses.length > 0
          ? Math.max(...prevExpenses.map((e) => e.id))
          : 0) + 1;

      let expense = {
        id: newId,
        description,
        amount,
        comment,
        date: new Date(date),
        type,
        wallet,
      };

      const newExpenses = [...prevExpenses, expense];
      storeExpenses(newExpenses);

      // Update idCounter after adding the new expense
      setIdCounter(newId);
      storeIdCounter(newId);
      console.log("Expense added:", expense);
      return newExpenses;
    });
  }

  function deleteExpense(id) {
    setExpenses((prevExpenses) => {
      const newExpenses = prevExpenses.filter((expense) => expense.id !== id);
      storeExpenses(newExpenses); // Use the new storeExpenses function
      return newExpenses;
    });
  }
  function updateExpense(id, amount, description, date, comment, type, wallet) {
    expenses.forEach((expense, index) => {
      if (expense.id === id) {
        expenses[index].amount = amount;
        expenses[index].description = description;
        expenses[index].comment = comment;
        expenses[index].date = new Date(date);
        expenses[index].type = type;
        expenses[index].wallet = wallet;
        storeExpenses(expenses);
      }
    });
  }

  function addWallet(amount, wallet) {
    if (wallet == "wallet") {
      setWallet((prevWallet) => {
        const newWallet = prevWallet + amount;
        storeWallet(newWallet);
        return newWallet;
      });
    } else if (wallet == "bankWallet") {
      setBankWallet((prevBankWallet) => {
        const newBankWallet = prevBankWallet + amount;
        storeBankWallet(newBankWallet);
        return newBankWallet;
      });
    }
  }

  function subtractWallet(amount, wallet) {
    if (wallet == "wallet") {
      setWallet((prevWallet) => {
        const newWallet = prevWallet - amount;
        storeWallet(newWallet);
        return newWallet;
      });
    } else if (wallet == "bankWallet") {
      setBankWallet((prevBankWallet) => {
        const newBankWallet = prevBankWallet - amount;
        storeBankWallet(newBankWallet);
        return newBankWallet;
      });
    }
  }

  function addReoccuringExpense(
    description,
    date,
    amount,
    comment,
    type,
    wallet
  ) {
    setReoccuringExpenses((prevExpenses) => {
      const newId =
        (prevExpenses.length > 0
          ? Math.max(...prevExpenses.map((e) => e.id))
          : 0) + 1;

      let expense = {
        id: newId,
        description,
        amount,
        comment,
        date: new Date(date),
        type,
        wallet,
        // dueDay: new Date(
        //   Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
        // ),
        dueDay: new Date(date),
      };

      const newExpenses = [...prevExpenses, expense];

      setReoccuringIdCounter(newId);
      storeReoccuringIdCounter(newId);
      storeReoccuringExpenses(newExpenses);
      return newExpenses;
    });
  }

  function processPendingExpenses() {
    reoccuringExpenses.forEach((expense) => {
      if (expense.dueDay <= new Date()) {
        addExpense(
          expense.description,
          expense.dueDay,
          expense.amount,
          expense.comment,
          expense.type,
          expense.wallet
        );

        let currentDueDay = new Date(expense.dueDay);
        currentDueDay.setMonth(currentDueDay.getMonth() + 1);
        let nextMonthDays = new Date(
          currentDueDay.getFullYear(),
          currentDueDay.getMonth() + 1,
          0
        ).getDate();

        if (nextMonthDays < expense.date.getDate()) {
          expense.dueDay = new Date(
            new Date().getFullYear(),
            currentDueDay.getMonth(),
            nextMonthDays.getDate()
          );
        } else {
          expense.dueDay = new Date(
            new Date().getFullYear(),
            currentDueDay.getMonth(),
            expense.date.getDate()
          );
        }

        editReoccuringExpenseDueDate(expense.id, expense.dueDay);
        addReoccuringExpenseToWallet(expense);
      }
    });
  }

  function addReoccuringExpenseToWallet(expense) {
    if (expense.category === "" || expense.amount === "") {
      return alert("Please enter a category and amount");
    } else {
      if (expense.type === "expense") {
        subtractWallet(parseFloat(expense.amount), expense.wallet);
      } else {
        addWallet(parseFloat(expense.amount), expense.wallet);
      }
    }
  }

  function editReoccuringExpenseDueDate(id, newDueDate) {
    reoccuringExpenses.forEach((expense) => {
      if (expense.id === id) {
        expense.dueDay = newDueDate;
        storeReoccuringExpenses(reoccuringExpenses);
      }
    });
  }

  function removeReoccuringExpense(id) {
    setReoccuringExpenses((prevExpenses) => {
      const newExpenses = prevExpenses.filter((expense) => expense.id !== id);
      storeReoccuringExpenses(newExpenses);
      return newExpenses;
    });
  }
  const value = {
    expenses: expenses,
    reoccuringExpenses: reoccuringExpenses,
    wallet: wallet,
    bankWallet: bankWallet,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,

    addReoccuringExpense: addReoccuringExpense,
    processPendingExpenses: processPendingExpenses,
    removeReoccuringExpense: removeReoccuringExpense,

    addWallet: addWallet,
    subtractWallet: subtractWallet,

    idCounter: idCounter,
  };

  return (
    <ExpenseEntriesContext.Provider
      value={value}
      // addExpense={addExpense}
      // updateExpense={updateExpense}
    >
      {children}
    </ExpenseEntriesContext.Provider>
  );
}

export default ExpenseEntriesContextProvider;
