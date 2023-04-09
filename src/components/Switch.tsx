import { useState, useEffect } from "react"

import { Switch } from "@headlessui/react"

import styles from "../styles/switch.module.scss"

type BTrackerSwitchProps = {
  value?: boolean
  onChange?: (value: boolean) => void
  title?: null | string
  className?: string
  color?: string[]
  flavorColor?: string
}

export function BTrackerSwitch({
  value = false,
  onChange,
  title = null,
  className = "",
  color = ["var(--red-I)", "var(--dark-I)"],
  flavorColor = "var(--white-I)"
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
        style={{ backgroundColor: switchState ? color[0] : color[1] }}
      >
        <span
          className={`${styles.flavor} ${flavorSelection}`}
          style={{ backgroundColor: flavorColor }}
        />
      </Switch>

      {hasTitle && <span className={styles["sr-only"]}>{title}</span>}
    </div>
  )
}
