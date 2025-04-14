// getExpensePerMonth.test.js
describe("getExpensePerMonth", () => {
    let expensesCtx;
    const mockDate = new Date(2025, 3, 14); // April 14, 2025 (current date)
  
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(mockDate);
    });
  
    afterAll(() => {
      jest.useRealTimers();
    });
  
    // The original function logic
    function getExpensePerMonth() {
      let currentDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        15
      );
      let monthlyExpenseArray = [];
      let monthCount = 0;
      for (let i = 0; i < 24; i++) {
        let sum = 0;
        expensesCtx.expenses.forEach((expense) => {
          if (
            expense.type == "expense" &&
            expense.date.getMonth() == currentDate.getMonth() &&
            expense.date.getFullYear() == currentDate.getFullYear()
          ) {
            sum += expense.amount;
          }
        });
        if (sum !== 0) {
          monthlyExpenseArray.push(sum.toFixed(2));
          monthCount++;
        }
        currentDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          15
        );
      }
      let sum = 0;
      monthlyExpenseArray.forEach((expense) => {
        sum += parseFloat(expense);
      });
      return (sum / monthCount).toFixed(2);
    }
  
    beforeEach(() => {
      expensesCtx = {
        expenses: [
          // April 2025 (current month)
          { type: "expense", amount: 100, date: new Date(2025, 3, 1) },
          { type: "expense", amount: 50, date: new Date(2025, 3, 15) },
          
          // March 2025
          { type: "expense", amount: 75, date: new Date(2025, 2, 10) },
          
          // February 2025
          { type: "expense", amount: 25, date: new Date(2025, 1, 20) },
          
          // January 2024 (previous year)
          { type: "expense", amount: 200, date: new Date(2024, 0, 5) },
          
          // Income should be ignored
          { type: "income", amount: 500, date: new Date(2025, 3, 20) }
        ]
      };
    });
  
    test("calculates average monthly expense for multiple months", () => {
      const result = getExpensePerMonth();
      // April: 150, March: 75, February: 25, January: 200
      // Average: (150 + 75 + 25 + 200) / 4 = 112.50
      expect(parseFloat(result)).toBeCloseTo(112.50);
    });
  
    test("returns NaN when no expenses exist", () => {
      expensesCtx.expenses = [];
      const result = getExpensePerMonth();
      expect(result).toBe("NaN");
    });
  
    test("ignores income entries", () => {
      expensesCtx.expenses = [
        { type: "income", amount: 500, date: new Date(2025, 3, 1) },
        { type: "income", amount: 300, date: new Date(2025, 2, 1) },
        { type: "expense", amount: 300, date: new Date(2025, 2, 1) }
      ];
      const result = getExpensePerMonth();
      expect(result).toBe("300.00");
    });
  
    test("handles single month with expenses", () => {
      expensesCtx.expenses = [
        { type: "expense", amount: 150, date: new Date(2025, 3, 1) }
      ];
      const result = getExpensePerMonth();
      expect(result).toBe("150.00");
    });
  
    test("handles decimal amounts correctly", () => {
      expensesCtx.expenses = [
        { type: "expense", amount: 99.95, date: new Date(2025, 3, 1) },
        { type: "expense", amount: 50.05, date: new Date(2025, 3, 1) }
      ];
      const result = getExpensePerMonth();
      expect(result).toBe("150.00");
    });
  
    test("excludes months with no expenses", () => {
      // Only April 2025 has expenses
      expensesCtx.expenses = [
        { type: "expense", amount: 100, date: new Date(2025, 3, 1) },
        { type: "expense", amount: 50, date: new Date(2025, 3, 15) }
      ];
      const result = getExpensePerMonth();
      expect(result).toBe("150.00");
    });
  
    test("handles expenses across multiple years", () => {
      expensesCtx.expenses = [
        { type: "expense", amount: 100, date: new Date(2025, 3, 1) },
        { type: "expense", amount: 200, date: new Date(2024, 11, 15) }
      ];
      const result = getExpensePerMonth();
      // April 2025: 100, December 2024: 200
      // Average: (100 + 200) / 2 = 150.00
      expect(result).toBe("150.00");
    });
  });
  