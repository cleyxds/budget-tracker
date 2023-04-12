import { useEffect } from "react"

import { useAuthentication } from "./hooks/useAuthentication"

import { useAuthStore } from "./stores/Auth"
import { useUserStore } from "./stores/User"
import { useExpensesStore } from "./stores/Expenses"

import { Modal } from "./components/Modal"
import { SyncExpensesModal } from "./components/Expense/SyncExpensesModal"

import { userActions } from "./services/user"

export function App() {
  const { user } = useUserStore()
  const { auth } = useAuthStore()

  const { expenses, setExpenses, toggleSyncModal } = useExpensesStore()
  const { syncModalOpen } = expenses

  const { isAuthenticated } = auth

  const { authenticateUser } = useAuthentication()

  useEffect(() => {
    if (isAuthenticated) return

    authenticateUser()
  }, [isAuthenticated])

  useEffect(() => {
    if (!user) return

    toggleSyncModal(true)
  }, [user])

  useEffect(() => {
    if (user && !syncModalOpen) {
      // MELHORAR A LÓGICA DE REFETCH DURANTE DO PROCESSO DE SINCRONIZAÇÃO
      userActions?.getUserExpenses(user?.userId).then(setExpenses)
    }
  }, [user, syncModalOpen])

  function renderSyncUserExpensesModal() {
    return <Modal anchor={null} render={SyncExpensesModal} openImmediately />
  }

  return syncModalOpen ? renderSyncUserExpensesModal() : null
}
