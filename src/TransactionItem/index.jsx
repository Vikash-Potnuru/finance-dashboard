import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteTransaction = () => {
    deleteTransaction(id)
  }

  return (
    <li className={"tableRow"}>
      <p className={"transactionText"}>{title}</p>
      <p className={"transactionText"}>Rs {amount}</p>
      <p className={"transactionText"}>{type}</p>
      <div className={"deleteContainer"}>
        <button
          className={"deleteButton"}
          type="button"
          onClick={onDeleteTransaction}
          data-testid="delete"
        >
          <img
            className={"deleteImg"}
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
