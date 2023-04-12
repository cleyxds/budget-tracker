import { useEffect } from "react"

import { useExpensesStore } from "../../stores/Expenses"

import { ExpenseItem } from "./ExpenseItem"
import { ExpensesPrice } from "./ExpensesPrice"

import { anonymousActions } from "../../services/expenses"

import styles from "../../styles/expenses.module.scss"

export function ExpensesList() {
  const { expenses, setExpenses } = useExpensesStore()
  const { userExpenses } = expenses

  const { getAnonymousExpenses } = anonymousActions

  async function loadExpenses() {
    const expenses = await getAnonymousExpenses()

    setExpenses(expenses)
  }

  useEffect(() => {
    loadExpenses()
  }, [])

  const isEmpty = userExpenses?.length === 0

  if (isEmpty) return null

  return (
    <>
      <ExpensesPrice expenses={userExpenses} />

      <section className={styles.expensesContainer}>
        <ul>
          {userExpenses?.map(expense => (
            <ExpenseItem key={expense?.createdAt} {...expense} />
          ))}
        </ul>
      </section>

      <button className={styles.loadMoreButton} onClick={loadExpenses}>
        Carregar mais
      </button>
    </>
  )
}
