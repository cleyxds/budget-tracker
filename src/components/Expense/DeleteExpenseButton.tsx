import { useState } from "react"

import { anonymousActions } from "../../services/expenses"

import DeleteIcon from "../../assets/icons/DeleteIcon"

import styles from "../../styles/expenses.module.scss"
import headerStyles from "../../styles/header.module.scss"

export function DeleteExpenseButton({ expense }) {
  const [isExpanded, setIsExpanded] = useState(false)

  function renderDeleteButton() {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className={`${headerStyles.commonButton} ${styles.spacing} ${styles.maxWidth}`}
      >
        <DeleteIcon size={18} color="var(--white-I)" />
        Deletar
      </button>
    )
  }

  function renderConfirmButton() {
    return (
      <button
        onClick={() => anonymousActions?.deleteAnonymousExpense(expense?.id)}
        className={`${styles.confirm} ${headerStyles.commonButton} ${styles.spacing} ${styles.maxWidth}`}
      >
        <DeleteIcon size={18} color="var(--white-I)" />
        Confirmar
      </button>
    )
  }

  return isExpanded ? renderConfirmButton() : renderDeleteButton()
}
