// calculateExpensesAmount.test.js

const sortedExpenses = [
    // Original expenses (e1-e10)
    {
      id: "e1",
      description: "Groceries",
      amount: 127.53,
      date: new Date(2024, 11, 3),
      comment: "Weekly Groceries",
      type: "expense",
    },
    {
      id: "e2",
      description: "Rent",
      amount: 1299.99,
      date: new Date(2025, 0, 15),
      comment: "January Rent",
      type: "expense",
    },
    {
      id: "e3",
      description: "Utilities",
      amount: 210.75,
      date: new Date(2025, 1, 1),
      comment: "February Utilities",
      type: "expense",
    },
    {
      id: "e4",
      description: "Health",
      amount: 85.2,
      date: new Date(2025, 1, 14),
      comment: "Doctor Visit",
      type: "expense",
    },
    {
      id: "e5",
      description: "Family",
      amount: 49.99,
      date: new Date(2025, 1, 1),
      comment: "Family Outing",
      type: "expense",
    },
    {
      id: "e6",
      description: "Entertainment",
      amount: 25.2,
      date: new Date(2025, 1, 12),
      comment: "Movie Tickets",
      type: "expense",
    },
    {
      id: "e7",
      description: "Dining Out",
      amount: 65.0,
      date: new Date(2024, 11, 20),
      comment: "Dinner with Friends",
      type: "expense",
    },
    {
      id: "e8",
      description: "Car Insurance",
      amount: 350.0,
      date: new Date(2025, 0, 20),
      comment: "Car Insurance Payment",
      type: "expense",
    },
    {
      id: "e9",
      description: "Gym Membership",
      amount: 50.0,
      date: new Date(2025, 1, 5),
      comment: "Monthly Gym Fee",
      type: "expense",
    },
    {
      id: "e10",
      description: "Education",
      amount: 150.0,
      date: new Date(2025, 1, 18),
      comment: "Online Course",
      type: "expense",
    },
    // Additional expenses (e11-e25)
    {
      id: "e11",
      description: "Bills",
      amount: 75.0,
      date: new Date(2025, 1, 25),
      comment: "Phone Bill",
      type: "expense",
    },
    {
      id: "e12",
      description: "Shopping",
      amount: 100.0,
      date: new Date(2025, 1, 28),
      comment: "New Clothes",
      type: "expense",
    },
    {
      id: "e13",
      description: "Salary",
      amount: 2500.12,
      date: new Date(2025, 1, 30),
      comment: "February Salary",
      type: "income",
    },
    {
      id: "e14",
      description: "Salary",
      amount: 1800.2,
      date: new Date(2025, 2, 28),
      comment: "March Salary",
      type: "income",
    },
    {
      id: "e15",
      description: "Gifts",
      amount: 100.0,
      date: new Date(2025, 2, 15),
      comment: "Birthday Gift",
      type: "income",
    },
    {
      id: "e16",
      description: "Other Income",
      amount: 500.0,
      date: new Date(2025, 2, 22),
      comment: "Freelance Work",
      type: "income",
    },
    {
      id: "e17",
      description: "Groceries",
      amount: 90.5,
      date: new Date(2024, 0, 5),
      comment: "January Groceries",
      type: "expense",
    },
    {
      id: "e18",
      description: "Entertainment",
      amount: 40.0,
      date: new Date(2024, 0, 18),
      comment: "Movie",
      type: "expense",
    },
    {
      id: "e19",
      description: "Utilities",
      amount: 110.2,
      date: new Date(2024, 2, 3),
      comment: "March Utilities",
      type: "expense",
    },
    {
      id: "e20",
      description: "Transportation",
      amount: 60.0,
      date: new Date(2024, 5, 10),
      comment: "June Transportation",
      type: "expense",
    },
    {
      id: "e21",
      description: "Shopping",
      amount: 120.0,
      date: new Date(2024, 8, 15),
      comment: "September Shopping",
      type: "expense",
    },
    {
      id: "e22",
      description: "Dining Out",
      amount: 75.5,
      date: new Date(2024, 10, 22),
      comment: "November Dinner",
      type: "expense",
    },
    {
      id: "e23",
      description: "Bonus",
      amount: 1000.0,
      date: new Date(2024, 11, 31),
      comment: "December Bonus",
      type: "income",
    },
    {
      id: "e24",
      description: "Salary",
      amount: 2500.0,
      date: new Date(2025, 0, 31),
      comment: "January Salary",
      type: "income",
    },
    {
      id: "e25",
      description: "Investments",
      amount: 300.0,
      date: new Date(2025, 2, 8),
      comment: "March Investments",
      type: "expense",
    }
  ];
  
  function calculateExpensesAmount(filteredExpenses) {
    let sum = 0;
    filteredExpenses.forEach((expense) => {
      expense.type === "expense" 
        ? sum -= parseFloat(expense.amount)
        : sum += parseFloat(expense.amount);
    });
    return sum.toFixed(2);
  }
  
  describe("calculateExpensesAmount", () => {
    test("should handle full dataset with mixed types", () => {
      const result = calculateExpensesAmount(sortedExpenses);
      const expected = (
        2500.12 + 1800.2 + 100.0 + 500.0 + 1000.0 + 2500.0 -  // Incomes
        (127.53 + 1299.99 + 210.75 + 85.2 + 49.99 + 25.2 + 65.0 + 
         350.0 + 50.0 + 150.0 + 75.0 + 100.0 + 90.5 + 40.0 + 
         110.2 + 60.0 + 120.0 + 75.5 + 300.0)
      ).toFixed(2);
      expect(result).toBe(expected);
    });
  
    test("should handle multiple small transactions", () => {
      const microTransactions = [
        { type: "expense", amount: "10.00" },
        { type: "income", amount: "5.50" },
        { type: "expense", amount: "2.30" },
        { type: "income", amount: "1.99" }
      ];
      const result = calculateExpensesAmount(microTransactions);
      expect(result).toBe((-10.00 - 2.30 + 5.50 + 1.99).toFixed(2));
    });
  
    test("should handle large income dominance", () => {
      const highIncome = sortedExpenses.filter(e => 
        e.type === "income" && e.amount > 2000
      );
      const result = calculateExpensesAmount(highIncome);
      const expected = (2500.12 + 2500.0).toFixed(2);
      expect(result).toBe(expected);
    });
  
    test("should handle expense dominance with no income", () => {
      const allExpenses = sortedExpenses.filter(e => e.type === "expense");
      const result = calculateExpensesAmount(allExpenses);
      const totalExpenses = allExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
      expect(result).toBe((-totalExpenses).toFixed(2));
    });
  
  
    test("should handle single transaction", () => {
      const singleIncome = [sortedExpenses.find(e => e.id === "e13")];
      const result = calculateExpensesAmount(singleIncome);
      expect(result).toBe("2500.12");
    });
  
    test("should handle year-specific filtering", () => {
      const year2024Expenses = sortedExpenses.filter(e => 
        e.date.getFullYear() === 2024
      );
      const result = calculateExpensesAmount(year2024Expenses);
      
      const expected = sortedExpenses
        .filter(e => e.date.getFullYear() === 2024)
        .reduce((sum, e) => e.type === "expense" ? 
          sum - parseFloat(e.amount) : 
          sum + parseFloat(e.amount), 0)
        .toFixed(2);
      
      expect(result).toBe(expected);
    });
  });
  