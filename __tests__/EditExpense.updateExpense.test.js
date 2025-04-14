describe("updateExpense Logic", () => {
    let expenseCtx, navigator, alertSpy;
  
    // The original function logic
    function updateExpense() {
      if (amount === "" || category === "") {
        return alert("Please enter a category and amount");
      } else {
        if (originalType === type) {
          if (type === "expense") {
            expenseCtx.subtractWallet(parseFloat(amount), currentWallet);
            expenseCtx.addWallet(parseFloat(originalAmount), currentWallet);
          } else {
            expenseCtx.addWallet(parseFloat(amount), currentWallet);
            expenseCtx.subtractWallet(parseFloat(originalAmount), currentWallet);
          }
        } else if (originalType !== type) {
          if (type === "expense") {
            expenseCtx.subtractWallet(parseFloat(amount), currentWallet);
            expenseCtx.subtractWallet(parseFloat(originalAmount), currentWallet);
          } else {
            expenseCtx.addWallet(parseFloat(amount), currentWallet);
            expenseCtx.addWallet(parseFloat(originalAmount), currentWallet);
          }
        }
  
        expenseCtx.updateExpense(
          id,
          amount,
          category,
          date,
          comment,
          type,
          currentWallet
        );
        navigator.navigate("BottomTabs", { screen: "Summary" });
      }
    }
  
    // Mock variables used in the function
    let id, amount, category, comment, date, type, currentWallet;
    let originalAmount, originalType;
  
    beforeEach(() => {
      // Mock context methods
      expenseCtx = {
        subtractWallet: jest.fn(),
        addWallet: jest.fn(),
        updateExpense: jest.fn(),
      };
  
      // Mock navigation
      navigator = { navigate: jest.fn() };
  
      // Dummy alert function
      global.alert = jest.fn();
  
      // Initialize default values for variables
      id = "1";
      amount = "100";
      category = "Food";
      comment = "Test comment";
      date = new Date();
      type = "expense";
      currentWallet = "Main";
      originalAmount = "50";
      originalType = "expense";
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test("updates an expense when validation passes and type remains unchanged", () => {
      updateExpense();
  
      expect(expenseCtx.subtractWallet).toHaveBeenCalledWith(parseFloat(amount), currentWallet);
      expect(expenseCtx.addWallet).toHaveBeenCalledWith(parseFloat(originalAmount), currentWallet);
      expect(expenseCtx.updateExpense).toHaveBeenCalledWith(
        id,
        amount,
        category,
        date,
        comment,
        type,
        currentWallet
      );
      expect(navigator.navigate).toHaveBeenCalledWith("BottomTabs", { screen: "Summary" });
    });
  
    test("updates an expense when validation passes and type changes to income", () => {
      type = "income";
  
      updateExpense();
  
      expect(expenseCtx.addWallet).toHaveBeenCalledWith(parseFloat(amount), currentWallet);
      expect(expenseCtx.addWallet).toHaveBeenCalledWith(parseFloat(originalAmount), currentWallet);
      expect(expenseCtx.updateExpense).toHaveBeenCalledWith(
        id,
        amount,
        category,
        date,
        comment,
        type,
        currentWallet
      );
    });
  
    test("shows an alert when required fields are missing", () => {
      category = "";
      amount = "";
  
      updateExpense();
  
      expect(global.alert).toHaveBeenCalledWith("Please enter a category and amount");
      expect(expenseCtx.updateExpense).not.toHaveBeenCalled();
    });
  
    test("handles decimal amounts correctly", () => {
      amount = "99.95";
  
      updateExpense();
  
      expect(expenseCtx.subtractWallet).toHaveBeenCalledWith(99.95, currentWallet);
    });
  });
  