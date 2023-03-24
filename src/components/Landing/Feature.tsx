import styles from "./feature.module.scss"

export function Feature({ title = "Feature title", subtitle = "", ...props }) {
  return (
    <li className={styles.feature} key={title}>
      <div className={styles.groupTitle}>
        <div className={styles.dot} />
        <p>{title}</p>
      </div>

      <span>{subtitle}</span>
    </li>
  )
}
