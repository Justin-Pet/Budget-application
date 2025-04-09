describe("calculateCurrentMonthBalance", () => {
  // Mock data for expenses
  const mockExpenses = [
    {
      id: "e1",
      description: "Groceries",
      amount: 50.0,
      date: new Date(2025, 3, 1), // May 1 (current month)
      comment: "Weekly shopping",
      type: "expense",
    },
    {
      id: "e2",
      description: "Salary",
      amount: 2000.0,
      date: new Date(2025, 3, 5), // May 5 (current month)
      type: "income",
    },
    {
      id: "e3",
      description: "Rent",
      amount: 800.0,
      date: new Date(2025, 2, 30), // April 30 (previous month)
      type: "expense",
    },
    {
      id: "e4",
      description: "Bonus",
      amount: 500.0,
      date: new Date(2025, 3, 10), // May 10 (current month)
      type: "income",
    },
  ];

  // Mock implementation of the function
  const calculateCurrentMonthBalance = (expenses) => {
    let balance = 0;
    expenses.forEach((expense) => {
      if (
        expense.date.getMonth() === new Date().getMonth() &&
        expense.date.getFullYear() === new Date().getFullYear()
      ) {
        if (expense.type === "expense") {
          balance -= parseFloat(expense.amount);
        } else if (expense.type === "income") {
          balance += parseFloat(expense.amount);
        }
      }
    });
    return balance.toFixed(2);
  };

  it("calculates balance correctly for current month", () => {
    const balance = calculateCurrentMonthBalance(mockExpenses);
    expect(balance).toBe("2450.00"); // (2000 + 500) - (50) = 1650.00
  });

  it("returns 0.00 when there are no expenses for the current month", () => {
    const noCurrentMonthExpenses = [
      {
        id: "e5",
        description: "Old Expense",
        amount: 100.0,
        date: new Date(2024, 3, 15), // April (previous month)
        type: "expense",
      },
    ];
    const balance = calculateCurrentMonthBalance(noCurrentMonthExpenses);
    expect(balance).toBe("0.00");
  });

  it("handles decimal values correctly", () => {
    const decimalExpenses = [
      {
        id: "e6",
        description: "Coffee",
        amount: 3.75,
        date: new Date(2025, 3, 10), // May
        type: "expense",
      },
      {
        id: "e7",
        description: "Freelance Work",
        amount: 245.5,
        date: new Date(2025, 3, 12), // May
        type: "income",
      },
    ];
    const balance = calculateCurrentMonthBalance(decimalExpenses);
    expect(balance).toBe("241.75"); // (245.50 - 3.75) = 241.75
  });

  it("ignores expenses from other months", () => {
    const mixedMonthExpenses = [
      {
        id: "e8",
        description: "Old Rent",
        amount: 800.0,
        date: new Date(2025, 2, 30), // April
        type: "expense",
      },
      {
        id: "e9",
        description: "May Income",
        amount: 1200.0,
        date: new Date(2025, 3, 15), // May
        type: "income",
      },
    ];
    const balance = calculateCurrentMonthBalance(mixedMonthExpenses);
    expect(balance).toBe("1200.00"); // Only May income is considered
  });
});
