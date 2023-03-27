import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/Auth"

import { HeaderLogin } from "./HeaderLogin"
import { CreateExpense } from "./Header/CreateExpense"

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
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const { isAuthenticated } = auth

  const HEADER_PRESET = {
    [PRESETS.DEFAULT]: {
      left: { render: renderLOGO },
      middle: { style: { display: "none" } },
      right: {
        style: { justifyContent: "flex-end" },
        render: renderDEFAULTRightPreset
      }
    },
    [PRESETS.LOGO]: {
      left: { render: renderLOGO },
      middle: { style: { display: "none" } },
      right: { style: { display: "none" } }
    },
    [PRESETS.DASHBOARD]: {
      left: { render: renderLOGO },
      middle: {
        style: {
          justifyContent: "center",
          marginLeft: "0.5rem",
          marginRight: "0.5rem"
        },
        render: renderCreateExpenseButton
      },
      right: {
        style: { justifyContent: "flex-end" },
        render: isAuthenticated ? renderUserMenu : renderRightPreset
      }
    }
  }

  const preset = HEADER_PRESET[chosenPreset]

  function renderLOGO() {
    return (
      <div className={`${styles.iconWrapper} ${styles.logo}`}>
        <Logo />
      </div>
    )
  }

  function renderRightPreset() {
    return (
      <div className={styles.headerRight}>
        <HeaderLogin />
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

  function renderButton(title, onClick) {
    return (
      <button onClick={onClick} className={styles.commonButton}>
        {title}
      </button>
    )
  }

  function renderCreateExpenseButton() {
    return (
      <CreateExpense
        anchor={onClick => renderButton("Criar despesa", onClick)}
      />
    )
  }

  function renderUserMenu() {
    return (
      <button className={styles.iconWrapper}>
        <MenuIcon />
      </button>
    )
  }

  function handleNavigateToDashboard() {
    navigate("/dashboard")
  }

  return (
    <header {...props} className={styles.headerContainer}>
      <div style={preset.left?.style}>{preset.left?.render?.()}</div>

      <div style={preset.middle?.style}>{preset.middle?.render?.()}</div>

      <div style={preset.right?.style}>{preset.right?.render?.()}</div>
    </header>
  )
}
