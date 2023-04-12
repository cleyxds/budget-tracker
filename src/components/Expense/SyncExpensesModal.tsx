import { useEffect, useState } from "react"

import { useExpensesStore, TExpense } from "../../stores/Expenses"

import { expensesActions } from "../../services/expenses"

import SyncIcon from "../../assets/icons/SyncIcon"

import styles from "../../styles/expenses.module.scss"

type TanonymousExpensesToSync = {
  anonymousExpenses: TExpense[]
  length: number
}

export function SyncExpensesModal({ actions }) {
  const { expenses, getAnonymousExpenses, toggleSyncModal } = useExpensesStore()
  const { userExpenses } = expenses

  const [anonymousExpensesToSync, setAnonymousExpensesToSync] =
    useState<TanonymousExpensesToSync>({ anonymousExpenses: [], length: 0 })

  const { anonymousExpenses, length } = anonymousExpensesToSync

  useEffect(() => {
    const anonymousExpenses = getAnonymousExpenses()
    const anonymousExpensesLenght = anonymousExpenses?.length

    setAnonymousExpensesToSync({
      anonymousExpenses,
      length: anonymousExpensesLenght
    })
  }, [userExpenses])

  const month = "Abril"

  async function handleSyncOfflineExpenses() {
    try {
      const firstExpense = anonymousExpenses?.[0]

      await expensesActions?.createExpense(firstExpense)
    } catch (error) {
      console.warn(error)
    } finally {
      actions.closeModal()
      toggleSyncModal(false)
    }
  }

  function handleNoSync() {
    actions?.closeModal()
    toggleSyncModal(false)
  }

  return (
    <section className={styles.syncModalContainer}>
      <SyncIcon />

      <h2>Deseja sincronizar as suas despesas offline com as online?</h2>
      <p>
        Essa ação irá adicionar {length} despesas ao mês de {month}.
      </p>

      <div className={styles.groupButton}>
        <button onClick={handleSyncOfflineExpenses}>Sim</button>

        <button onClick={handleNoSync}>Não</button>
      </div>
    </section>
  )
}
