import { useAuthStore } from "../../stores/Auth"

import { Header, PRESETS } from "../Header/Header"
import { Footer } from "../Footer"
import { SettingsList } from "./SettingsList"
import { LoginForm } from "../Login/LoginForm"

import styles from "../../styles/settings.module.scss"

export function Settings() {
  const { auth } = useAuthStore()
  const { isAuthenticated } = auth

  if (!isAuthenticated) return <LoginForm />

  return (
    <main className={styles.settings}>
      <section>
        <Header preset={PRESETS.TITLE} title="Configurações" />

        <SettingsList />
      </section>

      <Footer />
    </main>
  )
}
