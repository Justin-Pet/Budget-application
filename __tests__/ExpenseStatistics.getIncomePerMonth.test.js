describe("getIncomePerMonth", () => {
    let expensesCtx;
  
    // The original function logic
    function getIncomePerMonth() {
      let currentDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        15
      );
      let monthlyIncomeArray = [];
      let monthCount = 0;
  
      for (let i = 0; i < 24; i++) {
        let sum = 0;
        expensesCtx.expenses.forEach((expense) => {
          if (
            expense.type === "income" &&
            expense.date.getMonth() === currentDate.getMonth() &&
            expense.date.getFullYear() === currentDate.getFullYear()
          ) {
            sum += expense.amount;
          }
        });
        if (sum !== 0) {
          monthlyIncomeArray.push(sum.toFixed(2));
          monthCount++;
        }
        currentDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          15
        );
      }
  
      let sum = monthlyIncomeArray.reduce(
        (accum, value) => accum + parseFloat(value),
        0
      );
      return monthCount > 0 ? (sum / monthCount).toFixed(2) : "0.00";
    }
  
    beforeEach(() => {
      expensesCtx = {
        expenses: [
          // April 2025 (current month)
          { type: "income", amount: 200, date: new Date(2025, 3, 10) },
          { type: "income", amount: 100, date: new Date(2025, 3, 15) },
  
          // March 2025
          { type: "income", amount: 300, date: new Date(2025, 2, 10) },
  
          // February 2025
          { type: "income", amount: 150, date: new Date(2025, 1, 20) },
  
          // January 2024 (previous year)
          { type: "income", amount: 400, date: new Date(2024, 0, 5) },
  
          // Expenses should be ignored
          { type: "expense", amount: 500, date: new Date(2025, 3, 20) },
        ],
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    test("calculates average monthly income for multiple months", () => {
      const result = getIncomePerMonth();
  
      // Expected calculation:
      // April: (200 + 100 = 300)
      // March: (300)
      // February: (150)
      // January (previous year): (400)
      // Average: (300 + 300 + 150 + 400) / 4 = ~287.50
      expect(parseFloat(result)).toBeCloseTo(287.50);
    });
  
    test("returns '0.00' when there are no income entries", () => {
      expensesCtx.expenses = [];
      const result = getIncomePerMonth();
      expect(result).toBe("0.00");
    });
  
    test("ignores expense entries when calculating monthly income", () => {
      expensesCtx.expenses = [
        { type: "expense", amount: 500, date: new Date(2025, 3, 20) },
        { type: "expense", amount: 300, date: new Date(2025, 2, 15) },
      ];
      const result = getIncomePerMonth();
      expect(result).toBe("0.00");
    });
  
    test("handles a single month with income correctly", () => {
      expensesCtx.expenses = [
        { type: "income", amount: 150, date: new Date(2025, 3, 10) },
      ];
      const result = getIncomePerMonth();
      expect(result).toBe("150.00");
    });
  
    test("handles decimal amounts correctly across multiple months", () => {
      expensesCtx.expenses = [
        { type: "income", amount: 99.95, date: new Date(2025, 3, 10) },
        { type: "income", amount: 50.05, date: new Date(2025, 2, 15) },
      ];
      const result = getIncomePerMonth();
  
      // Expected calculation:
      // April (99.95), March (50.05)
      // Average: (99.95 + 50.05) / ~75.00
      expect(parseFloat(result)).toBeCloseTo(75.00);
    });
  
  });
  