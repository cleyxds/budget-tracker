import { useState } from "react"

import { Dialog } from "@headlessui/react"

import { BTrackerProgress } from "./Progress"
import { BTrackerSwitch } from "../Switch"

import { anonymousActions } from "../../services/expenses"
import { months } from "../../constants/months"

import styles from "../../styles/expenses.module.scss"
import headerStyles from "../../styles/header.module.scss"

export function ExpenseItem({ ...item }) {
  const currency = "R$"

  function handleExpandItem() {
    setIsExpanded(true)
  }

  async function updateExpenseFieldById(expenseId, field, value) {
    const expenses = await anonymousActions.getAnonymousExpenses()
    const expense = expenses?.find(item => item?.id === expenseId)
    const expenseIndex = expenses?.findIndex(item => item?.id === expenseId)

    let expensesArray = expenses
    let expenseObject = expense

    expenseObject[field] = value

    expensesArray[expenseIndex] = expenseObject

    anonymousActions.updateAnonymousExpenses(expensesArray)
  }

  const [isExpanded, setIsExpanded] = useState(false)

  function getProgressPercentage(leftValue = 0, rightValue = 0) {
    return (
      Math.round(((leftValue * 100) / rightValue + Number.EPSILON) * 100) / 100
    )
  }

  function getYearMonth() {
    const arrayYearMonth = item?.date?.split("-")
    const year = arrayYearMonth?.[0]
    const month = Number(arrayYearMonth?.[1]) - 1
    const monthText = months[month]

    return `${monthText} ${year}`
  }

  const progress = getProgressPercentage(item?.priceSpent, item?.price)
  const month = getYearMonth()

  return (
    <>
      <li
        onClick={handleExpandItem}
        className={styles.expenseItem}
        key={item?.id}
      >
        <p className={styles.expenseTitle}>{item?.name}</p>

        <p className={styles.expensePrice}>
          {currency} {item?.price}
        </p>
      </li>

      <Dialog
        as="div"
        className={headerStyles.createExpense}
        open={isExpanded}
        onClose={() => setIsExpanded(false)}
      >
        <div className={headerStyles.backdrop} aria-hidden="true" />

        <div className={headerStyles.container}>
          <Dialog.Panel
            className={`${headerStyles.panel} ${styles.expenseExpandedContainer}`}
          >
            <p>{item?.name}</p>

            <span>{month}</span>

            <BTrackerProgress
              value={progress}
              color="var(--red-I)"
              className={styles.progress}
            />

            <BTrackerSwitch
              value={item?.isRecurrent}
              onChange={value => {
                updateExpenseFieldById(item?.id, "isRecurrent", value)
              }}
              className={styles.spacing}
              title="Habilitar recorrencia"
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
