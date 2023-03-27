import { Header, PRESETS } from "../Header"
import { DashboardSearch } from "./DashboardSearch"
import { ExploreSection } from "./ExploreSection"
import { ExpensesList } from "./ExpensesList"
import { Footer } from "../Footer"

import styles from "../../styles/dashboard.module.scss"

export function Dashboard() {
  return (
    <>
      <Header preset={PRESETS.DASHBOARD} />

      <ExploreSection />

      <main className={styles.container}>
        <DashboardSearch />

        <ExpensesList />
      </main>

      <Footer />
    </>
  )
}
