import { useNavigate } from "react-router-dom"

import MenuIcon from "../assets/header/MenuIcon"
import Logo from "../assets/header/Logo"

import styles from "../styles/header.module.scss"

export const PRESETS = {
  DEFAULT: "DEFAULT",
  LOGO: "LOGO",
  DASHBOARD: "DASHBOARD"
}

export function Header({
  preset: chosenPreset = PRESETS["DEFAULT"],
  ...props
}) {
  const HEADER_PRESET = {
    [PRESETS.DEFAULT]: {
      left: {},
      middle: { style: { display: "none" } },
      right: {
        style: { justifyContent: "flex-end" },
        render: renderDEFAULTRightPreset
      }
    },
    [PRESETS.LOGO]: {
      left: {},
      middle: { style: { display: "none" } },
      right: { style: { display: "none" } }
    },
    [PRESETS.DASHBOARD]: {
      left: {},
      middle: { style: { display: "none" } },
      right: {
        style: { justifyContent: "flex-end" },
        render: renderLOGORightPreset
      }
    }
  }

  const preset = HEADER_PRESET[chosenPreset]

  function renderNull() {
    return null
  }

  function renderLOGORightPreset() {
    return (
      <div className={styles.headerRight}>
        <button onClick={handleLogin} className={styles.loginButton}>
          Entrar
        </button>
      </div>
    )
  }

  function renderDEFAULTRightPreset() {
    return (
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
    )
  }

  const navigate = useNavigate()

  function handleNavigateToDashboard() {
    navigate("/dashboard")
  }

  function handleLogin() {
    alert("handleLogin()")
  }

  return (
    <header {...props} className={styles.headerContainer}>
      <div style={preset.left?.style}>
        <div className={styles.iconWrapper}>
          <Logo />
        </div>
      </div>

      <div style={preset.middle?.style}></div>

      <div style={preset.right?.style}>{preset.right?.render?.()}</div>
    </header>
  )
}
