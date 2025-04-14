describe("getTotalExpenseAmount", () => {
    let expensesCtx;
  
    // The original function logic
    function getTotalExpenseAmount() {
      let sum = 0;
      expensesCtx.expenses.forEach((expense) => {
        if (expense.type === "expense") {
          sum += expense.amount;
        }
      });
      return sum.toFixed(2);
    }
  
    beforeEach(() => {
      expensesCtx = {
        expenses: [
          { type: "expense", amount: 100 },
          { type: "expense", amount: 50 },
          { type: "income", amount: 200 },
          { type: "expense", amount: 75 },
        ],
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test("calculates total expenses correctly with multiple entries", () => {
      const result = getTotalExpenseAmount();
      expect(result).toBe("225.00"); // Sum of 100 + 50 + 75
    });
  
    test("returns 0.00 when there are no expenses", () => {
      expensesCtx.expenses = [];
      const result = getTotalExpenseAmount();
      expect(result).toBe("0.00");
    });
  
    test("ignores income entries when calculating total expenses", () => {
      expensesCtx.expenses = [
        { type: "income", amount: 500 },
        { type: "income", amount: 300 },
      ];
      const result = getTotalExpenseAmount();
      expect(result).toBe("0.00");
    });
  
    test("handles decimal amounts correctly", () => {
      expensesCtx.expenses = [
        { type: "expense", amount: 99.95 },
        { type: "expense", amount: 50.05 },
      ];
      const result = getTotalExpenseAmount();
      expect(result).toBe("150.00"); // Sum of 99.95 + 50.05
    });
  
    test("handles a single expense entry correctly", () => {
      expensesCtx.expenses = [{ type: "expense", amount: 123.45 }];
      const result = getTotalExpenseAmount();
      expect(result).toBe("123.45");
    });
  
    test("handles negative expense amounts (edge case)", () => {
      expensesCtx.expenses = [
        { type: "expense", amount: -50 },
        { type: "expense", amount: -25 },
      ];
      const result = getTotalExpenseAmount();
      expect(result).toBe("-75.00"); // Sum of -50 + -25
    });
  
    test("handles mixed positive and negative expense amounts", () => {
      expensesCtx.expenses = [
        { type: "expense", amount: -50 },
        { type: "expense", amount: 100 },
        { type: "expense", amount: -25 },
        { type: "expense", amount: 75 },
      ];
      const result = getTotalExpenseAmount();
      expect(result).toBe("100.00"); // Sum of -50 + 100 + -25 + 75
    });
  });
  