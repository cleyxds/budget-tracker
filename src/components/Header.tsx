import styles from "../styles/header.module.scss"

export function Header({ ...props }) {
  return (
    <header {...props} className={styles.headerContainer}>
      <div>
        <div
          style={{
            width: 31,
            height: 31,
            borderRadius: 8,
            backgroundColor: "purple"
          }}
        />
      </div>

      <div style={{ display: "none" }}></div>

      <div style={{ justifyContent: "flex-end" }}>
        <div className={styles.headerRight}>
          <button className={styles.connectButton}>Connect wallet</button>

          <div
            style={{
              width: 31,
              height: 31,
              borderRadius: 8,
              backgroundColor: "purple",
              marginLeft: 16
            }}
          />
        </div>
      </div>
    </header>
  )
}
