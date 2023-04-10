import styles from "../../styles/dashboard.module.scss"

import MagnifyGlassIcon from "../../assets/icons/MagnifyGlassIcon"
import ChevronDown from "../../assets/ChevronDown"

export function DashboardSearch() {
  const filters = [
    { title: "Todas as categorias" },
    { title: "Completos" },
    { title: "Todos as despesas" }
  ]

  return (
    <section>
      <div className={styles.search}>
        <input placeholder="Pesquise por despesas" type="text" />

        <button className={styles.searchButton}>
          <MagnifyGlassIcon size={24} color="var(--white-I)" />
        </button>
      </div>

      <ul className={styles.filters}>
        {filters?.map(filter => (
          <button key={filter?.title}>
            <h3>{filter?.title}</h3>

            <ChevronDown />
          </button>
        ))}
      </ul>
    </section>
  )
}
