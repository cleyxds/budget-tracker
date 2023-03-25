import { auth } from "./firebase"

import { signInWithEmailAndPassword } from "firebase/auth"

import Cookies from "js-cookie"

export async function handleLoginEmail({ email, password }) {
  try {
    await signInWithEmailAndPassword(auth, email, password)

    await updateUserCookie({ userId: auth.currentUser.uid })

    alert(`Logado como ${auth.currentUser.uid}`)
  } catch (error) {
    throw new Error(error)
  }
}

// export async function handleRegister({ event, authentication, callback }) {
//   if (event === LOGIN_THIRD_PARTY["GOOGLE"]) {
//     await handleGoogleRegister()
//     return
//   }

//   const formData = new FormData(event?.target)

//   const formdata = {}
//   for (let field of formData) {
//     const [key, value] = field
//     formdata[key] = value
//   }

//   try {
//     const user = await createUserWithEmailAndPassword(
//       auth,
//       formdata?.email,
//       formdata?.password
//     )

//     await updateProfile(user.user, { displayName: formdata?.email })

//     await setDoc(userDoc(auth.currentUser.uid), {
//       username: user.user.displayName,
//       email: user.user.email,
//     })

//     await updateUserCookie({ userId: auth.currentUser.uid })

//     await proceedAppAuthentication({ authentication, formdata, callback })
//   } catch (error) {
//     if (error.message?.includes("auth/email-already-in-use")) {
//       return {
//         errors: {
//           email: "Email já cadastrado",
//         },
//       }
//     }

//     console.warn(error)
//   }
// }

// export async function handleLogout({ authentication, callback }) {
//   await proceedAppAuthentication({ authentication, callback, formdata: null })

//   await removeUserCookie()
// }

// async function handleGoogleLogin() {
//   alert("Google login")
// }

// async function handleGoogleRegister() {
//   alert("Google register")
// }

async function updateUserCookie({ userId }) {
  Cookies.set("JSESSIONID", userId, { expires: 7 })
}

// async function removeUserCookie() {
//   Cookies.remove("JSESSIONID")
// }

// async function proceedAppAuthentication({
//   formdata,
//   authentication,
//   callback,
// }) {
//   await wait({ ms: 1000, random: true })

//   authentication.update((state) => ({
//     ...state,
//     isAuthenticated: !state?.isAuthenticated,
//   }))

//   if (!formdata) {
//     callback?.()

//     return
//   }

//   callback?.(formdata)
// }
