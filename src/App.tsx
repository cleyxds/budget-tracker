import { useEffect } from "react"

import { useAuthentication } from "./hooks/useAuthentication"

import { useAuthStore } from "./stores/Auth"
import { useUserStore } from "./stores/User"
import { useExpensesStore } from "./stores/Expenses"

import { Modal } from "./components/Modal"
import { SyncExpensesModal } from "./components/Expense/SyncExpensesModal"

export function App() {
  const { user } = useUserStore()
  const { auth } = useAuthStore()

  const { expenses, toggleSyncModal } = useExpensesStore()
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

  useEffect(() => {}, [expenses])

  function renderSyncUserExpensesModal() {
    return (
      <Modal
        anchor={() => <button>Abrir</button>}
        render={SyncExpensesModal}
        openImmediately
      />
    )
  }

  return syncModalOpen ? renderSyncUserExpensesModal() : null
}
