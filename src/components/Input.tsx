import styles from "../styles/input.module.scss"

export function Input({ error, touched, ...props }) {
  return (
    <>
      <input {...props} />

      {!!touched && !!error && <span className={styles.error}>{error}</span>}
    </>
  )
}
