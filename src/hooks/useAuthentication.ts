import { useUserStore } from "../stores/User"
import { useAuthStore } from "../stores/Auth"

import { auth as firebaseauth } from "../services/firebase"

import { signInWithEmailAndPassword } from "firebase/auth"

import { getCurrentUser, updateUserCookie } from "../services/auth"
import { getUserData } from "../services/user"

export function useAuthentication() {
  const { user: storedUser, setUser } = useUserStore()
  const { auth, setAuth } = useAuthStore()

  async function handleLogin(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(firebaseauth, email, password)

      await updateUserCookie(firebaseauth.currentUser.uid)

      await authenticateUser()
    } catch (error) {
      throw new Error(error)
    }
  }

  async function authenticateUser() {
    try {
      const userId = await getCurrentUser()

      const user = await getUserData(userId)

      setAuth({
        ...auth,
        isAuthenticated: !auth?.isAuthenticated,
        accessToken: firebaseauth.currentUser?.accessToken,
        userId
      })

      setUser({
        ...storedUser,
        ...user
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  return { handleLogin }
}
