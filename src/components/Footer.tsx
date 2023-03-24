import styles from "../styles/footer.module.scss"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footerContainer}>
      <h3>© Copyright {year}</h3>
    </footer>
  )
}
