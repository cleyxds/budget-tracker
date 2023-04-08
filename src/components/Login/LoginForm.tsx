import { useCallback } from "react"

import { useFormik } from "formik"
import { useAuthentication } from "../../hooks/useAuthentication"

import { Input } from "../Input"

import { LoginSchema } from "./utils/schema"

import styles from "../../styles/header.module.scss"

export function LoginForm({ actions }) {
  const { handleLogin } = useAuthentication()

  const { handleSubmit, setFieldValue, errors, touched } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: values => handleLogin(values.email, values.password),
    validationSchema: LoginSchema
  })

  const handleInput = useCallback((field, e) => {
    return setFieldValue(field, e.target.value)
  }, [])

  return (
    <form noValidate onSubmit={handleSubmit} className={styles.login}>
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
    </form>
  )
}
