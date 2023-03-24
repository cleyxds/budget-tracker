import { useNavigate } from "react-router-dom"

import { Header } from "../Header"
import { Feature } from "./Feature"
import { Footer } from "../Footer"

import styles from "../../styles/landing.module.scss"

export function Landing() {
  const navigate = useNavigate()

  function handleNavigateToDashboard() {
    navigate("/dashboard")
  }

  const features = [
    {
      title: "Criar despesas mensais"
    },
    {
      title: "Manter despesas recorrentes"
    },
    {
      title: "Receber notificações e emails",
      subtitle: "Fique tranquilo, também não gostamos de spam ;)"
    }
  ]

  return (
    <>
      <Header />

      <div className={styles.container}>
        <div className={styles.cardI}>
          <h2>Budget Tracker</h2>

          <h1>Descubra como é ser livre de surpresas financeiras 💰</h1>

          <h2>Seu registro financeiro em um só lugar</h2>

          <button onClick={handleNavigateToDashboard}>Explore</button>
        </div>

        <div className={styles.featureContainer}>
          <h1>O que você consegue fazer</h1>

          <ul className={styles.box}>
            {features?.map(item => (
              <Feature {...item} />
            ))}
          </ul>
        </div>
      </div>

      <Footer />
    </>
  )
}
