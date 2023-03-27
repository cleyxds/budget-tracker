import { default as CurrencyInputLibrary } from "react-currency-masked-input"

import styles from "../styles/input.module.scss"

export function CurrencyInput({ error, touched, ...props }) {
  return (
    <>
      <CurrencyInputLibrary {...props} />

      {!!touched && !!error && <p className={styles.error}>{error}</p>}
    </>
  )
}
