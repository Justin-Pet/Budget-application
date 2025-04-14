describe("deleteExpense Logic", () => {
    let expenseCtx, navigator;
  
    // The original function logic
    function deleteExpense() {
      if (type === "expense") {
        expenseCtx.addWallet(parseFloat(amount), currentWallet);
      } else {
        expenseCtx.subtractWallet(parseFloat(amount), currentWallet);
      }
      expenseCtx.deleteExpense(id);
      navigator.navigate("BottomTabs", { screen: "Summary" });
    }
  
    // Mock variables used in the function
    let id, amount, type, currentWallet;
  
    beforeEach(() => {
      // Mock context methods
      expenseCtx = {
        addWallet: jest.fn(),
        subtractWallet: jest.fn(),
        deleteExpense: jest.fn(),
      };
  
      // Mock navigation
      navigator = { navigate: jest.fn() };
  
      // Initialize default values for variables
      id = "1";
      amount = "100";
      type = "expense";
      currentWallet = "Main";
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test("deletes an expense and updates wallet balance for expense type", () => {
      deleteExpense();
  
      expect(expenseCtx.addWallet).toHaveBeenCalledWith(parseFloat(amount), currentWallet);
      expect(expenseCtx.deleteExpense).toHaveBeenCalledWith(id);
      expect(navigator.navigate).toHaveBeenCalledWith("BottomTabs", { screen: "Summary" });
    });
  
    test("deletes an income and updates wallet balance for income type", () => {
      type = "income";
  
      deleteExpense();
  
      expect(expenseCtx.subtractWallet).toHaveBeenCalledWith(parseFloat(amount), currentWallet);
      expect(expenseCtx.deleteExpense).toHaveBeenCalledWith(id);
      expect(navigator.navigate).toHaveBeenCalledWith("BottomTabs", { screen: "Summary" });
    });
  
    test("handles decimal amounts correctly for expense type", () => {
      amount = "99.95";
  
      deleteExpense();
  
      expect(expenseCtx.addWallet).toHaveBeenCalledWith(99.95, currentWallet);
    });
  
    test("handles decimal amounts correctly for income type", () => {
      type = "income";
      amount = "99.95";
  
      deleteExpense();
  
      expect(expenseCtx.subtractWallet).toHaveBeenCalledWith(99.95, currentWallet);
    });
  });
  