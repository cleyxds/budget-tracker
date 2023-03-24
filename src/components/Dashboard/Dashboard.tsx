import { Header, PRESETS } from "../Header"

import styles from "../../styles/dashboard.module.scss"

export function Dashboard() {
  return (
    <>
      <Header preset={PRESETS.DASHBOARD} />

      <main className={styles.container}></main>
    </>
  )
}
