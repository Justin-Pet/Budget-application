import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

/**
 * Provides a context for managing and storing expense-related data including
 * expenses, reoccuring expenses, and wallet balances. This context provider
 * offers functions for adding, updating, and removing both regular and
 * reoccuring expenses, as well as managing wallet balances. It handles
 * persistent storage and retrieval of data using AsyncStorage. The context
 * also processes pending reoccuring expenses based on due dates.
 *
 * @param {Object} children - The children components that will have access to
 * the provided context values and functions.
 */

function ExpenseEntriesContextProvider({ children }) {
  let [idCounter, setIdCounter] = useState(1);
  let [reoccuringIdCounter, setReoccuringIdCounter] = useState(1);
  let [reoccuringExpenses, setReoccuringExpenses] = useState([]);
  let [expenses, setExpenses] = useState([]);
  let [wallet, setWallet] = useState(0);
  let [bankWallet, setBankWallet] = useState(0);

  /**
   * Stores the current idCounter value in AsyncStorage.
   * @param {number} value - The value to be stored.
   */
  const storeIdCounter = async (value) => {
    try {
      await AsyncStorage.setItem("idCounter", value.toString());
    } catch (error) {
      console.warn(error);
    }
  };

  /**
   * Stores the current reoccuringIdCounter value in AsyncStorage.
   * @param {number} value - The reoccuring ID counter value to be stored.
   */

  /**
   * Stores the current reoccuringIdCounter value in AsyncStorage.
   * @param {number} value - The reoccuring ID counter value to be stored.
   */
  const storeReoccuringIdCounter = async (value) => {
    try {
      await AsyncStorage.setItem("reoccuringIdCounter", value.toString());
    } catch (error) {
      console.warn(error);
    }
  };

  /**
   * Stores the current wallet value in AsyncStorage.
   * @param {number} value - The wallet value to be stored.
   */
  const storeWallet = async (value) => {
    try {
      await AsyncStorage.setItem("wallet", value.toString());
    } catch (error) {
      console.warn(error);
    }
  };

  /**
   * Stores the current bankWallet value in AsyncStorage.
   * @param {number} value - The bankWallet value to be stored.
   */
  const storeBankWallet = async (value) => {
    try {
      await AsyncStorage.setItem("bankWallet", value.toString());
    } catch (error) {
      console.warn(error);
    }
  };

  /**
   * Stores the current expenses state in AsyncStorage.
   * @param {Array} value - The expenses state to be stored.
   */
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

  /**
   * Stores the current reoccuringExpenses state in AsyncStorage.
   * @param {Array} value - The reoccuringExpenses state to be stored.
   */
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

  /**
   * Retrieves the current idCounter value from AsyncStorage.
   * If the value is not found or there is an error, it returns 0.
   * @returns {number} The current idCounter value.
   */
  const loadIdCounter = async () => {
    try {
      const value = await AsyncStorage.getItem("idCounter");
      return value ? parseInt(value) : 1;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  };

  /**
   * Retrieves the current reoccuringIdCounter value from AsyncStorage.
   * If the value is not found or there is an error, it returns 1.
   * @returns {number} The current reoccuringIdCounter value.
   */
  const loadReoccuringIdCounter = async () => {
    try {
      const value = await AsyncStorage.getItem("reoccuringIdCounter");
      return value ? parseInt(value) : 1;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  };
  /**
   * Retrieves the current wallet value from AsyncStorage.
   * If the value is not found or there is an error, it returns 0.
   * @returns {number} The current wallet value.
   */

  /**
   * Retrieves the current wallet value from AsyncStorage.
   * If the value is not found or there is an error, it returns 0.
   * @returns {number} The current wallet value.
   */
  const loadWallet = async () => {
    try {
      const value = await AsyncStorage.getItem("wallet");
      return value ? parseInt(value) : 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  };

  /**
   * Retrieves the current bankWallet value from AsyncStorage.
   * If the value is not found or there is an error, it returns 0.
   * @returns {number} The current bankWallet value.
   */
  const loadBankWallet = async () => {
    try {
      const value = await AsyncStorage.getItem("bankWallet");
      return value ? parseInt(value) : 0;
    } catch (error) {
      console.warn(error);
      return 0;
    }
  };

  /**
   * Retrieves the expenses from AsyncStorage and parses them into an array of
   * expense objects. Each expense object includes a `date` field converted
   * from a string to a Date object. If no expenses are stored or an error
   * occurs, it returns an empty array.
   * @returns {Promise<Array>} A promise that resolves to an array of expense
   * objects, each with a `date` field as a Date object.
   */

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

  /**
   * Retrieves the reoccuring expenses from AsyncStorage and parses them into an array of
   * expense objects. Each expense object includes a `date` field and a `dueDay` field,
   * both converted from strings to Date objects. If no reoccuring expenses are stored or
   * an error occurs, it returns an empty array.
   * @returns {Promise<Array>} A promise that resolves to an array of expense objects,
   * each with a `date` field and a `dueDay` field as Date objects.
   */
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

  /**
   * Clears all AsyncStorage data and resets the context state values.
   * @function
   * @async
   * @returns {Promise<void>} A promise that resolves when the AsyncStorage is cleared.
   */
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

  /**
   * Adds a new expense to the list of expenses. Generates a new ID based on the existing
   * IDs and stores the new expense in AsyncStorage. Updates the idCounter to the new
   * ID value.
   * @param {string} description - The description of the expense.
   * @param {Date|string} date - The date of the expense as a Date object or a string
   * that can be converted to a Date object.
   * @param {number} amount - The amount of the expense.
   * @param {string} comment - The comment for the expense.
   * @param {string} type - The type of the expense, either 'expense' or 'income'.
   * @param {string} wallet - The wallet that the expense belongs to.
   * @returns {Array} The new list of expenses with the added expense.
   */
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

  /**
   * Deletes an expense from the list of expenses based on the given ID.
   * @param {number} id - The ID of the expense to delete.
   * @returns {Array} The new list of expenses with the deleted expense removed.
   */
  function deleteExpense(id) {
    setExpenses((prevExpenses) => {
      const newExpenses = prevExpenses.filter((expense) => expense.id !== id);
      storeExpenses(newExpenses); // Use the new storeExpenses function
      return newExpenses;
    });
  }
  /**
   * Updates an expense in the list of expenses based on the given ID.
   * @param {number} id - The ID of the expense to update.
   * @param {number} amount - The new amount of the expense.
   * @param {string} description - The new description of the expense.
   * @param {Date|string} date - The new date of the expense as a Date object or a string
   * that can be converted to a Date object.
   * @param {string} comment - The new comment for the expense.
   * @param {string} type - The new type of the expense, either 'expense' or 'income'.
   * @param {string} wallet - The new wallet that the expense belongs to.
   * @returns {void}
   */
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

  /**
   * Adds the specified amount to the chosen wallet and updates the stored value.
   * If the wallet parameter is "wallet", it updates the primary wallet balance.
   * If the wallet parameter is "bankWallet", it updates the bank wallet balance.
   *
   * @param {number} amount - The amount to be added to the wallet.
   * @param {string} wallet - The wallet type, either "wallet" or "bankWallet".
   */

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

  /**
   * Subtracts the specified amount from the chosen wallet and updates the stored value.
   * If the wallet parameter is "wallet", it updates the primary wallet balance.
   * If the wallet parameter is "bankWallet", it updates the bank wallet balance.
   *
   * @param {number} amount - The amount to be subtracted from the wallet.
   * @param {string} wallet - The wallet type, either "wallet" or "bankWallet".
   */

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

  /**
   * Adds a reoccuring expense to the list of reoccuring expenses and stores
   * the updated list.
   * @param {string} description - The description of the expense.
   * @param {Date|string} date - The date of the expense as a Date object or a string
   * that can be converted to a Date object.
   * @param {number} amount - The amount of the expense.
   * @param {string} comment - The comment for the expense.
   * @param {string} type - The type of the expense, either 'expense' or 'income'.
   * @param {string} wallet - The wallet that the expense belongs to.
   * @returns {Array} The new list of reoccuring expenses with the added expense.
   */
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

  /**
   * Processes each reoccuring expense and checks if its due date is today or earlier.
   * If so, adds the expense to the list of regular expenses and updates its due date to the next month.
   * The due date is adjusted to the last day of the month if the original day is greater than the number of days in the next month.
   * Updates the stored reoccuring expense's due date and adds the reoccuring expense to the wallet balance.
   */

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

  /**
   * Handles adding a reoccuring expense to the wallet. If the type of the expense is
   * "expense", it subtracts the amount from the wallet. If the type is "income", it adds
   * the amount to the wallet. If either the category or amount is empty, it shows an
   * alert box with an error message.
   * @param {Object} expense - The expense object to be added to the wallet.
   */
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

  /**
   * Updates the due date of a reoccuring expense based on the given ID.
   * Iterates through the list of reoccuring expenses to find the matching
   * expense by ID and sets its `dueDay` to the provided new due date.
   * Stores the updated list of reoccuring expenses in AsyncStorage.
   *
   * @param {number} id - The ID of the reoccuring expense to update.
   * @param {Date} newDueDate - The new due date to set for the reoccuring expense.
   */

  function editReoccuringExpenseDueDate(id, newDueDate) {
    reoccuringExpenses.forEach((expense) => {
      if (expense.id === id) {
        expense.dueDay = newDueDate;
        storeReoccuringExpenses(reoccuringExpenses);
      }
    });
  }

  /**
   * Deletes a reoccuring expense from the list of reoccuring expenses based on the given ID.
   * @param {number} id - The ID of the reoccuring expense to delete.
   * @returns {Array} The new list of reoccuring expenses with the deleted expense removed.
   */
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
