import { useEffect, useState } from "react"

import { TExpense } from "../../stores/Expenses"

import styles from "../../styles/expenses.module.scss"

type TExpensesPriceProps = {
  expenses: TExpense[]
}

type TPriceState = string | number | null

export function ExpensesPrice({ expenses }: TExpensesPriceProps) {
  const [price, setPrice] = useState<TPriceState>(null)

  function filterByCompleted(item: TExpense) {
    return !!item?.isCompleted
  }

  function calculateTotalPrice(expenses: TExpense[]) {
    const price = expenses
      ?.filter(filterByCompleted)
      ?.map(item => item?.price)
      ?.reduce((prev, curr) => Number(prev) + Number(curr), 0)

    setPrice(price)
  }

  useEffect(() => {
    calculateTotalPrice(expenses)
  }, [expenses])

  if (!price) return null

  return (
    <section className={styles.expensesPrice}>
      <span>Gastos</span>

      <p>R$ {price}</p>
    </section>
  )
}
