import { useState } from "react"
import { Dialog, Switch } from "@headlessui/react"

import { Progress } from "./Progress"

import styles from "../../styles/expenses.module.scss"
import headerStyles from "../../styles/header.module.scss"

export function ExpenseItem({ ...item }) {
  const currency = "R$"

  function handleExpandItem() {
    setIsOpen(true)
  }

  const [isOpen, setIsOpen] = useState(false)
  const [enabledFeature, setEnabledFeature] = useState(false)

  return (
    <>
      <li
        onClick={handleExpandItem}
        className={styles.expenseItem}
        key={item?.id}
      >
        <p className={styles.expenseTitle}>{item?.name}</p>

        <p className={styles.expensePrice}>
          {currency} {item?.maxPrice}
        </p>
      </li>

      <Dialog
        as="div"
        className={headerStyles.createExpense}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className={headerStyles.backdrop} aria-hidden="true" />

        <div className={headerStyles.container}>
          <Dialog.Panel
            className={`${headerStyles.panel} ${styles.expenseExpandedContainer}`}
          >
            <p>{item?.name}</p>

            <span>{item?.date}</span>

            <Progress color="var(--red-I)" className={styles.progress} />

            <Switch
              checked={enabledFeature}
              onChange={setEnabledFeature}
              style={{
                backgroundColor: enabledFeature
                  ? "var(--red-I)"
                  : "var(--dark-I)"
              }}
              className={`${styles.switch} ${styles.progress}`}
            >
              <span className={styles["sr-only"]}>Habilitar recorrencia</span>

              <span
                className={styles.switchFlavor}
                style={{ translate: enabledFeature ? 24 : 2 }}
              />
            </Switch>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
