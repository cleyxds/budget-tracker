import styles from "../styles/header.module.scss"

export function Header({ ...props }) {
  return <header {...props} className={styles.headerContainer} />
}
