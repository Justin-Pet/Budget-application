// filterExpenses.test.js

const sortedExpenses = [
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
      date: new Date(2025, 1, 27),
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
  
  let selectedYear = "All";
  let selectedMonth = "All";
  
  const getSelectedMonth = () => {
    const months = {
      January: 0, February: 1, March: 2, April: 3,
      May: 4, June: 5, July: 6, August: 7,
      September: 8, October: 9, November: 10, December: 11
    };
    return months[selectedMonth];
  };
  
  function filterExpenses() {
    return sortedExpenses.filter((expense) => {
      if ((selectedYear === "All" && selectedMonth === "All") ||
          (selectedYear === "Visi" && selectedMonth === "Visi")) {
        return true;
      }
      
      if ((selectedYear !== "All" && selectedMonth === "All") ||
          (selectedYear !== "Visi" && selectedMonth === "Visi")) {
        return expense.date.getFullYear() === selectedYear;
      }
      
      if ((selectedYear !== "All" && selectedMonth !== "All") ||
          (selectedYear !== "Visi" && selectedMonth !== "Visi")) {
        return expense.date.getFullYear() === selectedYear && 
               expense.date.getMonth() === getSelectedMonth();
      }
    });
  }
  
  describe("filterExpenses", () => {
    test("returns all 25 items when filters are 'All'", () => {
      selectedYear = "All";
      selectedMonth = "All";
      expect(filterExpenses()).toHaveLength(25);
    });
  
    test("filters 2025 items correctly", () => {
      selectedYear = 2025;
      selectedMonth = "All";
      const result = filterExpenses();
      expect(result).toHaveLength(16);
      expect(result.every(e => e.date.getFullYear() === 2025)).toBe(true);
    });
  
    test("precisely filters February 2025 expenses", () => {
      selectedYear = 2025;
      selectedMonth = "February";
      const result = filterExpenses();
      expect(result).toHaveLength(9);
      expect(result.every(e => 
        e.date.getFullYear() === 2025 && 
        e.date.getMonth() === 1
      )).toBe(true);
    });
  
    test("handles Lithuanian 'Visi' filter", () => {
      selectedYear = "Visi";
      selectedMonth = "Visi";
      expect(filterExpenses()).toHaveLength(25);
    });
  
    test("returns empty array for non-existent 2023 data", () => {
      selectedYear = 2023;
      selectedMonth = "January";
      expect(filterExpenses()).toEqual([]);
    });
  
    test("correctly filters January 2024 expenses", () => {
      selectedYear = 2024;
      selectedMonth = "January";
      const result = filterExpenses();
      expect(result).toHaveLength(2);
      expect(result.map(e => e.id)).toEqual(["e17", "e18"]);
    });
  
    test("handles March 2024 utilities", () => {
      selectedYear = 2024;
      selectedMonth = "March";
      const result = filterExpenses();
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("e19");
    });
  });
  