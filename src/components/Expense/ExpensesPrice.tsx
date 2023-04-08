import { useEffect, useState } from "react"

import styles from "../../styles/expenses.module.scss"

export function ExpensesPrice({ values = [] }) {
  const [price, setPrice] = useState(null)

  function calculateResult(values) {
    const price = values
      ?.map(item => item?.price)
      ?.reduce((prev, curr) => prev + curr, 0)

    setPrice(price)
  }

  useEffect(() => {
    calculateResult(values)
  }, [values])

  if (!price) return null

  return (
    <section className={styles.expensesPrice}>
      <span>Gastos</span>

      <p>R$ {price}</p>
    </section>
  )
}
