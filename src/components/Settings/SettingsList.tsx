import { useState } from "react"

import { useNavigate } from "react-router-dom"
import { useAuthentication } from "../../hooks/useAuthentication"

import { Loader } from "../Loader"
import { BTrackerSwitch } from "../Switch"

import LogoutIcon from "../../assets/icons/LogoutIcon"
import HomeIcon from "../../assets/icons/HomeIcon"

import styles from "../../styles/settings.module.scss"

export function SettingsList() {
  const navigate = useNavigate()
  const { handleLogout: asyncHandleLogout } = useAuthentication()

  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  const options = [
    {
      title: "Conta",
      icon: null
    },
    {
      title: "Mudar senha",
      icon: null
    },
    {
      title: "Habilitar notificações",
      disabled: true,
      icon: props => (
        <BTrackerSwitch
          {...props}
          value={notificationsEnabled}
          onChange={setNotificationsEnabled}
          flavorColor="var(--dark-I)"
          color={["var(--red-I)", "var(--white-I)"]}
        />
      )
    },
    {
      title: "Início",
      icon: () => <HomeIcon color="var(--white-I)" size={24} />,
      handler: () => navigate("/")
    },
    {
      title: "Sair",
      color: "var(--red-I)",
      icon: () => <LogoutIcon color="var(--red-I)" size={24} />,
      handler: handleLogout
    }
  ]

  function generateLoadingIndexes() {
    return options?.map(() => false)
  }

  function updateLoadingIndex(index, value = null) {
    setLoadingIndexes(state => {
      const clone = [...state]
      let operation = !clone[index]

      if (value) {
        operation = value
      }

      clone[index] = operation

      return clone
    })
  }

  async function handleLogout() {
    try {
      updateLoadingIndex(3, true)

      await asyncHandleLogout()

      updateLoadingIndex(3, false)

      navigate("/")
    } catch (error) {
      alert("Houve um problema ao sair da sua conta")
    }
  }

  const [loadingIndexes, setLoadingIndexes] = useState(generateLoadingIndexes)

  function renderOption(item, index) {
    const hasIcon = !!item?.icon
    const IconComponent = item?.icon
    const isLoading = loadingIndexes?.[index]
    const handler = item?.handler
    const isDisabled = item?.disabled

    return (
      <div key={item?.title} className={styles.optionItemWrapper}>
        <li className={styles.optionItem}>
          {hasIcon && <IconComponent />}

          <button
            disabled={isDisabled ?? false}
            onClick={handler}
            className={isDisabled ? styles.spacing : undefined}
            style={{ color: item?.color ?? "var(--white-I)" }}
          >
            {item?.title}
          </button>
        </li>

        {isLoading && <Loader />}
      </div>
    )
  }

  return <ul className={styles.options}>{options?.map(renderOption)}</ul>
}
