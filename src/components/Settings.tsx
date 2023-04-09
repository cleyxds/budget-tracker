import { useAuthStore } from "../stores/Auth"

import { Header, PRESETS } from "./Header/Header"
import { Footer } from "./Footer"

export function Settings() {
  const { auth } = useAuthStore()
  const { isAuthenticated } = auth

  if (!isAuthenticated)
    return (
      <div>
        <h1>You are not logged in bro, chill out!</h1>
      </div>
    )

  return (
    <>
      <Header preset={PRESETS.LOGO} />

      <Footer />
    </>
  )
}
