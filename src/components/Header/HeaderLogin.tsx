import { LoginForm } from "../Login/LoginForm"
import { Modal } from "../Modal"

import styles from "../../styles/header.module.scss"

export function HeaderLogin() {
  function renderAnchor({ actions }) {
    return (
      <button className={styles.loginButton} onClick={actions.openModal}>
        Entrar
      </button>
    )
  }

  return <Modal anchor={renderAnchor} render={LoginForm} />
}
