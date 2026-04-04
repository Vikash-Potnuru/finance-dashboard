import {Component} from 'react'
import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class FinanceManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    searchInput: '',
    titleError: false,
    amountError: false,
  }

  componentDidMount() {
    const storedData = localStorage.getItem('transactionsList')
    if (storedData) {
      this.setState({transactionsList: JSON.parse(storedData)})
    }
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionList = transactionsList.filter(
      eachTransaction => id !== eachTransaction.id,
    )

    this.setState({
      transactionsList: updatedTransactionList,
    }, () => {
      localStorage.setItem('transactionsList', JSON.stringify(this.state.transactionsList))
    })
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    this.setState({titleError: false, amountError: false})
    if (titleInput.trim().length === 0) {
        this.setState({titleError: true})
        if ((!/^\d+$/.test(amountInput)) || amountInput.trim().length === 0) {
          this.setState({amountError: true})
        }
        return
    }
    if ((!/^\d+$/.test(amountInput)) || amountInput.trim().length === 0) {
      this.setState({amountError: true})
       return
    }
    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
      titleError: false,
      amountError: false,
    }), () => {
      localStorage.setItem('transactionsList', JSON.stringify(this.state.transactionsList))
    })
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList, searchInput, titleError, amountError} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    const searchResults = transactionsList.filter(eachTransaction =>
      eachTransaction.title.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className={"appContainer"}>
        <div className={"responsiveContainer"}>
          <div className={"headerContainer"}>
            <h1 className={"heading"}>Hi, Vikash Potnuru</h1>
            <p className={"headerContent"}>
              Welcome back to your
              <span className={"moneyManagerText"}> Finance Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expensesAmount={expensesAmount}
          />
          <div className={"transactionDetails"}>
            <form className={"transactionForm"} onSubmit={this.onAddTransaction}>
              <h1 className={"transactionHeader"}>Add Transaction</h1>
              <label className={"inputLabel"} htmlFor="title">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                value={titleInput}
                onChange={this.onChangeTitleInput}
                className={"input"}
                placeholder="TITLE"
              />
              {titleError && <p className={"errorMessage"}>Please enter the valid title</p>}
              <label className={"inputLabel"} htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="text"
                id="amount"
                className={"input"}
                value={amountInput}
                onChange={this.onChangeAmountInput}
                placeholder="AMOUNT"
              />
              {amountError && <p className={"errorMessage"}>Please enter the valid amount</p>}
              <label className={"inputLabel"} htmlFor="select">
                TYPE
              </label>
              <select
                id="select"
                className={"input"}
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className={"button"}>
                Add
              </button>
            </form>
            <div className={"historyTransactions"}>
              <h1 className={"transactionHeader"}>History</h1>
              <input type="search" className={"searchInputCss"} placeholder="Search" onChange={this.onSearch} />
              <div className={"transactionsTableContainer"}>
                <ul className={"transactionsTable"}>
                  <li className={"tableHeader"}>
                    <p className={"tableHeaderCell"}>Title</p>
                    <p className={"tableHeaderCell"}>Amount</p>
                    <p className={"tableHeaderCell"}>Type</p>
                  </li>
                  {searchResults.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FinanceManager
