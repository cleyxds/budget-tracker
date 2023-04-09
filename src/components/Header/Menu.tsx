import { Popover } from "@headlessui/react"

import MenuIcon from "../../assets/header/MenuIcon"

import styles from "../../styles/header.module.scss"

export function Menu() {
  const options = [
    {
      title: "Configurações",
      url: "/settings"
    }
  ]

  function renderOption(item) {
    return <a href={item?.url}>{item?.title}</a>
  }

  return (
    <Popover className={styles.menu}>
      <Popover.Button className={styles.iconWrapper}>
        <MenuIcon />
      </Popover.Button>

      <Popover.Panel as="nav" className={styles.navigator}>
        {options?.map(renderOption)}
      </Popover.Panel>
    </Popover>
  )
}
