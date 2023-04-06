import { useState, useEffect } from "react"

import { Switch } from "@headlessui/react"

import styles from "../styles/switch.module.scss"

type BTrackerSwitchProps = {
  value?: boolean
  onChange?: (value: boolean) => void
  title?: null | string
  className?: string
}

export function BTrackerSwitch({
  value = false,
  onChange,
  title = null,
  className = ""
}: BTrackerSwitchProps) {
  const [switchState, setSwitchState] = useState(value)

  useEffect(() => {
    onChange?.(switchState)
  }, [switchState])

  const hasTitle = !!title
  const isSelected = !!switchState ? true : false

  const flavorSelection = isSelected ? styles.selected : styles.unselected

  return (
    <div className={`${styles.container} ${className}`}>
      <Switch
        checked={switchState}
        onChange={setSwitchState}
        className={styles.switch}
        style={{
          backgroundColor: switchState ? "var(--red-I)" : "var(--dark-I)"
        }}
      >
        <span className={`${styles.flavor} ${flavorSelection}`} />
      </Switch>

      {hasTitle && <span className={styles["sr-only"]}>{title}</span>}
    </div>
  )
}
