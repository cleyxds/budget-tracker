import { useEffect, useState } from "react"

import { ExpenseItem } from "./ExpenseItem"
import { ExpensesPrice } from "./ExpensesPrice"

import { anonymousActions } from "../../services/expenses"

import styles from "../../styles/expenses.module.scss"

export function ExpensesList() {
  const { getAnonymousExpenses } = anonymousActions

  const [expenses, setExpenses] = useState([])

  async function loadExpenses() {
    const expenses = await getAnonymousExpenses()

    setExpenses(expenses)
  }

  useEffect(() => {
    loadExpenses()
  }, [])

  const isEmpty = expenses?.length === 0

  if (isEmpty) return null

  return (
    <>
      <ExpensesPrice values={expenses} />

      <section className={styles.expensesContainer}>
        <ul>
          {expenses?.map(expense => (
            <ExpenseItem key={expense?.id} {...expense} />
          ))}
        </ul>
      </section>

      <button className={styles.loadMoreButton} onClick={loadExpenses}>
        Carregar mais
      </button>
    </>
  )
}
