import styles from "./feature.module.scss"

export function Feature({
  title = "Feature title",
  subtitle = "Feature subtitle",
  ...props
}) {
  return (
    <li className={styles.feature} key={title}>
      <div className={styles.dot} />

      <p>{title}</p>
    </li>
  )
}
