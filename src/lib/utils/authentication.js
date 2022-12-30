import { auth, userDoc } from "../../services/firebase"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"

import Cookies from "js-cookie"
import { setDoc } from "firebase/firestore"
import wait from "./wait"

const LOGIN_THIRD_PARTY = {
  GOOGLE: "google",
}

export async function handleLogin({ event, authentication, callback }) {
  if (event === LOGIN_THIRD_PARTY["GOOGLE"]) {
    await handleGoogleLogin()
    return
  }

  const formData = new FormData(event?.target)

  const formdata = {}
  for (let field of formData) {
    const [key, value] = field
    formdata[key] = value
  }

  try {
    await signInWithEmailAndPassword(auth, formdata?.email, formdata?.password)

    await updateUserCookie({ userId: auth.currentUser.uid })

    await proceedAppAuthentication({ formdata, authentication, callback })
  } catch (error) {
    console.warn("error when logging the user", error)
  }
}

export async function handleRegister({ event, authentication, callback }) {
  if (event === LOGIN_THIRD_PARTY["GOOGLE"]) {
    await handleGoogleRegister()
    return
  }

  const formData = new FormData(event?.target)

  const formdata = {}
  for (let field of formData) {
    const [key, value] = field
    formdata[key] = value
  }

  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      formdata?.email,
      formdata?.password
    )

    await updateProfile(user.user, { displayName: formdata?.email })

    await setDoc(userDoc(auth.currentUser.uid), {
      username: user.user.displayName,
      email: user.user.email,
    })

    await updateUserCookie({ userId: auth.currentUser.uid })

    await proceedAppAuthentication({ authentication, formdata, callback })
  } catch (error) {
    console.warn("error from creating user", error)
  }
}

export async function handleLogout({ authentication, callback }) {
  await proceedAppAuthentication({ authentication, callback, formdata: null })

  await removeUserCookie()
}

async function handleGoogleLogin() {
  alert("Google login")
}

async function handleGoogleRegister() {
  alert("Google register")
}

async function updateUserCookie({ userId }) {
  Cookies.set("JSESSIONID", userId)
}

async function removeUserCookie() {
  Cookies.remove("JSESSIONID")
}

async function proceedAppAuthentication({
  formdata,
  authentication,
  callback,
}) {
  await wait({ ms: 1000, random: true })

  authentication.update((state) => ({
    ...state,
    isAuthenticated: !state?.isAuthenticated,
  }))

  if (!formdata) {
    callback?.()

    return
  }

  callback?.(formdata)
}
