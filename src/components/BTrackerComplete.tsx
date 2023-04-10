import { useEffect, useState } from "react"

import styles from "../styles/expenses.module.scss"

import CheckedRadioIcon from "../assets/icons/CheckedRadioIcon"
import UncheckedRadioIcon from "../assets/icons/UncheckedRadioIcon"

type BTrackerCompleteProps = {
  value?: boolean
  onChange?: (value: boolean) => void
}

export function BTrackerComplete({
  value = false,
  onChange
}: BTrackerCompleteProps) {
  const [isComplete, setIsComplete] = useState(false)

  function toggleComplete() {
    setIsComplete(!isComplete)
    onChange?.(!isComplete)
  }

  useEffect(() => {
    setIsComplete(value)
  }, [value])

  function renderChecked() {
    return (
      <button className={styles.complete} onClick={toggleComplete}>
        <CheckedRadioIcon color="var(--red-I)" size={32} />
        Completo
      </button>
    )
  }

  function renderUnchecked() {
    return (
      <button className={styles.complete} onClick={toggleComplete}>
        <UncheckedRadioIcon size={32} />
        Completo
      </button>
    )
  }

  return isComplete ? renderChecked() : renderUnchecked()
}
