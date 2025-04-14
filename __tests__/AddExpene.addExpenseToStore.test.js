describe("addExpenseToStore Logic", () => {
    let mockContext, mockNavigate, mockAlert;
  
    // Actual function logic extracted from the component
    const addExpenseToStore = ({
      category,
      amount,
      comment,
      date,
      type,
      currentWallet,
      reoccuringPayment,
      context,
      navigation,
      alert,
    }) => {
      if (reoccuringPayment) {
        if (!category || !amount) {
          alert("Please enter a category and amount");
          return;
        }
        context.addReoccuringExpense(
          category,
          date,
          parseFloat(amount),
          comment,
          type,
          currentWallet
        );
      } else {
        if (!category || !amount) {
          alert("Please enter a category and amount");
          return;
        }
        if (type === "expense") {
          context.subtractWallet(parseFloat(amount), currentWallet);
        } else {
          context.addWallet(parseFloat(amount), currentWallet);
        }
        context.addExpense(
          category,
          date,
          parseFloat(amount),
          comment,
          type,
          currentWallet
        );
      }
  
      navigation.navigate("BottomTabs", { screen: "Summary" });
    };
  
    beforeEach(() => {
      // Mock context methods
      mockContext = {
        addReoccuringExpense: jest.fn(),
        subtractWallet: jest.fn(),
        addWallet: jest.fn(),
        addExpense: jest.fn(),
      };
  
      // Mock navigation
      mockNavigate = { navigate: jest.fn() };
  
      // Mock alert function
      mockAlert = jest.fn();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    const setupParams = (overrides = {}) => ({
      category: "Food",
      amount: "100",
      comment: "Test comment",
      date: new Date(),
      type: "expense",
      currentWallet: "Main",
      reoccuringPayment: false,
      context: mockContext,
      navigation: mockNavigate,
      alert: mockAlert,
      ...overrides,
    });
  
    test("valid recurring payment", () => {
      const params = setupParams({ reoccuringPayment: true });
  
      addExpenseToStore(params);
  
      expect(mockContext.addReoccuringExpense).toHaveBeenCalledWith(
        params.category,
        params.date,
        parseFloat(params.amount),
        params.comment,
        params.type,
        params.currentWallet
      );
      expect(mockNavigate.navigate).toHaveBeenCalledWith("BottomTabs", { screen: "Summary" });
    });
  
    test("valid expense transaction", () => {
      const params = setupParams();
  
      addExpenseToStore(params);
  
      expect(mockContext.subtractWallet).toHaveBeenCalledWith(
        parseFloat(params.amount),
        params.currentWallet
      );
      expect(mockContext.addExpense).toHaveBeenCalledWith(
        params.category,
        params.date,
        parseFloat(params.amount),
        params.comment,
        params.type,
        params.currentWallet
      );
    });
  
    test("valid income transaction", () => {
      const params = setupParams({ type: "income" });
  
      addExpenseToStore(params);
  
      expect(mockContext.addWallet).toHaveBeenCalledWith(
        parseFloat(params.amount),
        params.currentWallet
      );
      expect(mockContext.addExpense).toHaveBeenCalledWith(
        params.category,
        params.date,
        parseFloat(params.amount),
        params.comment,
        params.type,
        params.currentWallet
      );
    });
  
    test("missing required fields for recurring payment", () => {
      const params = setupParams({ reoccuringPayment: true, category: "", amount: "" });
  
      addExpenseToStore(params);
  
      expect(mockAlert).toHaveBeenCalledWith("Please enter a category and amount");
      expect(mockContext.addReoccuringExpense).not.toHaveBeenCalled();
    });
  
    test("missing required fields for regular payment", () => {
      const params = setupParams({ category: "", amount: "" });
  
      addExpenseToStore(params);
  
      expect(mockAlert).toHaveBeenCalledWith("Please enter a category and amount");
      expect(mockContext.addExpense).not.toHaveBeenCalled();
    });
  
    test("decimal amount handling", () => {
      const params = setupParams({ amount: "99.95" });
  
      addExpenseToStore(params);
  
      expect(mockContext.subtractWallet).toHaveBeenCalledWith(99.95, "Main");
    });
  });
  