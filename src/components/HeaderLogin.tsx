import { useCallback } from "react"

import { useAuthentication } from "../hooks/useAuthentication"
import { useFormik } from "formik"
import * as Yup from "yup"

import { Popover } from "@headlessui/react"
import { Input } from "./Input"

import styles from "../styles/header.module.scss"

export function HeaderLogin() {
  const { handleLogin } = useAuthentication()

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Deve conter um formato de email")
      .required("Campo requerido"),
    password: Yup.string().required("Campo requerido")
  })

  const { handleSubmit, setFieldValue, errors, touched } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: values => handleLogin(values.email, values.password),
    validationSchema: LoginSchema
  })

  const handleInput = useCallback((field, e) => {
    return setFieldValue(field, e.target.value)
  }, [])

  return (
    <Popover className={styles.loginRight}>
      <Popover.Button className={styles.loginButton}>Entrar</Popover.Button>

      <Popover.Panel
        as="form"
        noValidate
        onSubmit={handleSubmit}
        className={styles.login}
      >
        <h3>Faça login para utilizar as vantagens.</h3>

        <div>
          <p>E-mail</p>

          <Input
            error={errors.email}
            touched={touched.email}
            type="email"
            name="email"
            placeholder="Seu email"
            onChange={e => handleInput("email", e)}
          />
        </div>

        <div>
          <p>Senha</p>

          <Input
            error={errors.password}
            touched={touched.password}
            type="password"
            name="password"
            placeholder="Sua senha"
            onChange={e => handleInput("password", e)}
          />
        </div>

        <button type="submit">Fazer login</button>
      </Popover.Panel>
    </Popover>
  )
}
