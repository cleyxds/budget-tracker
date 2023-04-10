import { useState } from "react"

import { Dialog } from "@headlessui/react"

import { BTrackerProgress } from "./Progress"
import { BTrackerSwitch } from "../Switch"
import { BTrackerComplete } from "../BTrackerComplete"
import { DeleteExpenseButton } from "./DeleteExpenseButton"
import { Input } from "../Input"

import { anonymousActions } from "../../services/expenses"
import { months } from "../../constants/months"

import styles from "../../styles/expenses.module.scss"
import headerStyles from "../../styles/header.module.scss"

export function ExpenseItem({ ...item }) {
  const currency = "R$"
  const enableProgress = false

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

    await anonymousActions.updateAnonymousExpenses(expensesArray)
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

      {isExpanded && (
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
              <Input disabled className={styles.editable} value={item?.name} />

              <span>{month}</span>

              {enableProgress && (
                <BTrackerProgress
                  value={progress}
                  color="var(--red-I)"
                  className={styles.progress}
                />
              )}

              <BTrackerComplete
                value={item?.isCompleted}
                onChange={value => {
                  updateExpenseFieldById(item?.id, "isCompleted", value)
                }}
              />

              <BTrackerSwitch
                value={item?.isRecurrent}
                onChange={value => {
                  updateExpenseFieldById(item?.id, "isRecurrent", value)
                }}
                className={styles.spacing}
                title="Habilitar recorrencia"
              />

              <DeleteExpenseButton expense={item} />
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </>
  )
}
