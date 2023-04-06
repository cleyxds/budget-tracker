import { useState, useCallback } from "react"

import { useFormik } from "formik"
import { nanoid } from "nanoid"
import * as Yup from "yup"

import { Dialog } from "@headlessui/react"

import { Input } from "../Input"
import { CurrencyInput } from "../CurrencyInput"

import { anonymousActions } from "../../services/expenses"

import styles from "../../styles/header.module.scss"

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  )
}

export function CreateExpense({ anchor }) {
  const { createAnonymousExpense } = anonymousActions

  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    resetForm()
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const NewExpenseSchema = Yup.object().shape({
    title: Yup.string().required("Campo requerido"),
    price: Yup.string().required("Campo requerido")
  })

  const { handleSubmit, setFieldValue, values, errors, touched, resetForm } =
    useFormik({
      initialValues: { title: "", price: "" },
      onSubmit: values => createExpense(values.title, values.price),
      validationSchema: NewExpenseSchema
    })

  async function createExpense(title, price) {
    function formatPrice(value: string) {
      let price = value
      let dotIndex = value?.indexOf(".")
      const numberIndexAfterDot = dotIndex + 1
      const numberAfterDot = price?.[numberIndexAfterDot]

      price = value.replaceAt(dotIndex, `${numberAfterDot}.`)

      return Number?.(price)
    }

    const id = nanoid(28)

    const expense = {
      id,
      name: title,
      price: formatPrice(price),
      priceSpent: 0,
      date: "2023-04",
      createdAt: Date.now(),
      isCompleted: false,
      isRecurrent: false,
      isOffline: true
    }

    try {
      await createAnonymousExpense(expense)

      setIsOpen(false)

      resetForm()
    } catch (error) {
      console.warn(error)
    }
  }

  const handleInput = useCallback((field, e) => {
    return setFieldValue(field, e.target.value)
  }, [])

  return (
    <>
      {anchor(openModal)}

      <Dialog
        as="div"
        className={styles.createExpense}
        open={isOpen}
        onClose={closeModal}
      >
        <div className={styles.backdrop} aria-hidden="true" />

        <div className={styles.container}>
          <Dialog.Panel className={styles.panel}>
            <h3>Crie uma despesa do mês de Março</h3>

            <div className={styles.horizontalLine} />

            <form noValidate onSubmit={handleSubmit}>
              <div>
                <p>Nome da despesa</p>

                <Input
                  error={errors.title}
                  touched={touched.title}
                  value={values.title}
                  placeholder="Nome da despesa"
                  onChange={e => handleInput("title", e)}
                />
              </div>

              <div>
                <p>Valor da despesa</p>

                <CurrencyInput
                  error={errors.price}
                  touched={touched.price}
                  placeholder="1,00"
                  onChange={e => handleInput("price", e)}
                />
              </div>

              <button type="submit">Criar</button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
