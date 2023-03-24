import styles from "../../styles/dashboard.module.scss"

import SearchIcon from "../../assets/dashboard/SearchIcon"
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
          <SearchIcon />
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
