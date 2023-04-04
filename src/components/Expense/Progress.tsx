import styles from "../../styles/expenses.module.scss"

export function Progress({ value = 50, color = "var(--dark-II)", ...props }) {
  return (
    <div {...props} className={styles.progress}>
      <div
        className={styles.fill}
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  )
}
