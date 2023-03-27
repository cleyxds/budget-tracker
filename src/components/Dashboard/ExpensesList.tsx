import { useEffect, useState } from "react"

import styles from "../../styles/expenses.module.scss"

const ANONYMOUS_ID = "anonymous_expenses"

export function ExpensesList() {
  const [expenses, setExpenses] = useState([])

  function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem(ANONYMOUS_ID)) ?? []

    setExpenses(expenses)
  }

  useEffect(() => {
    loadExpenses()
  }, [])

  const isEmpty = expenses?.length === 0

  if (isEmpty) return null

  return (
    <>
      <section className={styles.expensesContainer}>
        <ul>
          {expenses?.map(item => {
            return (
              <li className={styles.expenseItem} key={item?.id}>
                {JSON.stringify(item)}
              </li>
            )
          })}
        </ul>
      </section>

      <button className={styles.loadMoreButton} onClick={loadExpenses}>
        Carregar mais
      </button>
    </>
  )
}
