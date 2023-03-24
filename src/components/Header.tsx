import { useNavigate } from "react-router-dom"

import MenuIcon from "../assets/header/MenuIcon"
import Logo from "../assets/header/Logo"

import styles from "../styles/header.module.scss"

export function Header({ ...props }) {
  const navigate = useNavigate()

  function handleNavigateToDashboard() {
    navigate("/dashboard")
  }

  return (
    <header {...props} className={styles.headerContainer}>
      <div>
        <div className={styles.iconWrapper}>
          <Logo />
        </div>
      </div>

      <div style={{ display: "none" }}></div>

      <div style={{ justifyContent: "flex-end" }}>
        <div className={styles.headerRight}>
          <button
            onClick={handleNavigateToDashboard}
            className={styles.connectButton}
          >
            Conhecer
          </button>

          <button className={styles.iconWrapper}>
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  )
}
