import styles from "../styles/header.module.scss"

import MenuIcon from "../assets/header/MenuIcon"
import Logo from "../assets/header/Logo"

export function Header({ ...props }) {
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
          <button className={styles.connectButton}>Connect wallet</button>

          <button className={styles.iconWrapper}>
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  )
}
