import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props

  return (
    <div className="moneyDetailsContainer">
      <div className="balanceContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="detailsImg"
        />
        <div>
          <p className="detailsText">Your Balance</p>
          <p className="detailsMoney" data-testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="incomeContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="detailsImg"
        />
        <div>
          <p className="detailsText">Your Income</p>
          <p className="detailsMoney" data-testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="expensesContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="detailsImg"
        />
        <div>
          <p className="detailsText">Your Expenses</p>
          <p className="detailsMoney" data-testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
