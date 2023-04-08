import * as Yup from "yup"

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Deve conter um formato de email")
    .required("Campo requerido"),
  password: Yup.string().required("Campo requerido")
})
