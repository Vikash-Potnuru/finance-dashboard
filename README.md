# Finance Dashboard

A modern and responsive React-based personal finance management application that helps users track their income and expenses.

## Features

### Transaction Management
- **Add Transactions**: Easily add income or expense transactions with title, amount, and type
- **Multiple Transaction Types**: Support for Income and Expenses categories
- **Delete Transactions**: Remove transactions from history with one click
- **Input Validation**: Robust validation for transaction titles and amounts with user-friendly error messages

### Financial Tracking
- **Balance Summary**: View your current balance at a glance
- **Income Tracking**: Monitor total income across all transactions
- **Expense Tracking**: Track total expenses separately
- **Real-time Calculations**: Automatic calculation of balance, income, and expenses

### Search & History
- **Transaction History**: View all transactions in an organized table format
- **Search Functionality**: Search transactions by title for quick access
- **Responsive Table**: Clean and organized transaction history display

### Data Persistence
- **Local Storage Integration**: All transactions are saved to browser local storage
- **Data Persistence**: Your financial data persists even after closing the browser


## Project Structure

```
finance-dashboard/
├── src/
│   ├── App.jsx              # Main App component
│   ├── App.css              # App styles
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   ├── FinanceManager/       # Main finance manager component
│   │   ├── index.jsx
│   │   └── index.css
│   ├── MoneyDetails/        # Financial summary display
│   │   ├── index.jsx
│   │   └── index.css
│   ├── TransactionItem/     # Individual transaction component
│   │   ├── index.jsx
│   │   └── index.css
│   └── assets/              # Static assets
├── public/                  # Public assets
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
└── README.md               # Project documentation
```

## Components Overview

### App
- Root component that renders the FinanceManager

### FinanceManager
- Main component managing transaction state and logic
- Handles adding, deleting, and searching transactions
- Calculates financial metrics (balance, income, expenses)
- Manages form inputs and validation

### MoneyDetails
- Displays financial summary cards:
  - Current Balance
  - Total Income
  - Total Expenses

### TransactionItem
- Represents individual transaction in the history table
- Displays transaction details (title, amount, type)
- Provides delete functionality for each transaction

## Data Storage

All transactions are stored in the browser's localStorage under the key `transactionsList`. The data persists between sessions and is automatically saved whenever transactions are added or deleted.

## Validation

- **Title Validation**: Title must not be empty
- **Amount Validation**: Amount must be a valid positive number

Error messages are displayed when validation fails, helping users input correct data.

## Key Functionalities

1. **Add Transaction Form**
   - Input fields for title and amount
   - Dropdown selector for transaction type (Income/Expenses)
   - Submit button to add transaction
   - Real-time validation feedback

2. **Financial Summary**
   - Three cards showing Balance, Income, and Expenses
   - Updates automatically when transactions change

3. **Transaction History**
   - Sortable table view of all transactions
   - Search bar to filter transactions
   - Delete button for each transaction

## Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop screens
- Tablets
- Mobile devices
