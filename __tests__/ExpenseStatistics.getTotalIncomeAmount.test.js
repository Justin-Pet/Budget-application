describe("getTotalIncomeAmount", () => {
  let expensesCtx;

  // The original function logic
  function getTotalIncomeAmount() {
    let sum = 0;
    expensesCtx.expenses.forEach((expense) => {
      if (expense.type === "income") {
        sum += expense.amount;
      }
    });
    return sum.toFixed(2);
  }

  beforeEach(() => {
    expensesCtx = {
      expenses: [
        { type: "income", amount: 200 },
        { type: "income", amount: 300 },
        { type: "expense", amount: 100 },
        { type: "income", amount: 150 },
      ],
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("calculates total income correctly with multiple entries", () => {
    const result = getTotalIncomeAmount();
    expect(result).toBe("650.00"); // Sum of 200 + 300 + 150
  });

  test("returns 0.00 when there are no income entries", () => {
    expensesCtx.expenses = [];
    const result = getTotalIncomeAmount();
    expect(result).toBe("0.00");
  });

  test("ignores expense entries when calculating total income", () => {
    expensesCtx.expenses = [
      { type: "expense", amount: 500 },
      { type: "expense", amount: 300 },
    ];
    const result = getTotalIncomeAmount();
    expect(result).toBe("0.00");
  });

  test("handles decimal amounts correctly", () => {
    expensesCtx.expenses = [
      { type: "income", amount: 99.95 },
      { type: "income", amount: 50.05 },
    ];
    const result = getTotalIncomeAmount();
    expect(result).toBe("150.00"); // Sum of 99.95 + 50.05
  });

  test("handles a single income entry correctly", () => {
    expensesCtx.expenses = [{ type: "income", amount: 123.45 }];
    const result = getTotalIncomeAmount();
    expect(result).toBe("123.45");
  });

  test("handles negative income amounts (edge case)", () => {
    expensesCtx.expenses = [
      { type: "income", amount: -50 },
      { type: "income", amount: -25 },
    ];
    const result = getTotalIncomeAmount();
    expect(result).toBe("-75.00"); // Sum of -50 + -25
  });

  test("handles mixed positive and negative income amounts", () => {
    expensesCtx.expenses = [
      { type: "income", amount: -50 },
      { type: "income", amount: 100 },
      { type: "income", amount: -25 },
      { type: "income", amount: 75 },
    ];
    const result = getTotalIncomeAmount();
    expect(result).toBe("100.00"); // Sum of -50 + 100 + -25 + 75
  });
});
