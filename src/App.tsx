import { useEffect } from "react"

import { useAuthentication } from "./hooks/useAuthentication"

import { useAuthStore } from "./stores/Auth"
import { useUserStore } from "./stores/User"

export function App() {
  const { user } = useUserStore()
  const { auth } = useAuthStore()

  const { isAuthenticated } = auth

  const { authenticateUser } = useAuthentication()

  useEffect(() => {
    if (isAuthenticated) return

    authenticateUser()
  }, [isAuthenticated])

  useEffect(() => {
    if (!user) return
  }, [user])

  return null
}
