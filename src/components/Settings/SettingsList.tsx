import { useState } from "react"

import { Loader } from "../Loader"
import { BTrackerSwitch } from "../Switch"

import { wait } from "../../utils/wait"

import styles from "../../styles/settings.module.scss"

export function SettingsList() {
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
      icon: () => (
        <BTrackerSwitch
          value={notificationsEnabled}
          onChange={setNotificationsEnabled}
          flavorColor="var(--dark-I)"
          color={["var(--red-I)", "var(--white-I)"]}
        />
      )
    },
    {
      title: "Sair",
      color: "var(--red-I)",
      icon: null,
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
    updateLoadingIndex(3, true)

    await wait({ ms: 2000, random: true })

    updateLoadingIndex(3, false)
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
            className={isDisabled ? styles.spacing : undefined}
            disabled={isDisabled ?? false}
            onClick={handler}
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
