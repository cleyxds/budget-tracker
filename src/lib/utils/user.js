import Cookies from "js-cookie"

import { getDoc } from "firebase/firestore"

import { expenses } from "../../stores/expenses"

import { userDoc } from "../../services/firebase"
import { handleGetUserExpenses } from "./expenses"

import { ERRORS } from "../constants/errors"

export async function getInitialUserData({ authenticationCallback }) {
  const JSESSIONID = Cookies.get("JSESSIONID")
  const userId = JSESSIONID

  try {
    if (!userId) throw new Error(ERRORS["NO_CREDENTIALS"])

    const user = await getDoc(userDoc(JSESSIONID))
    const userData = user?.data()

    await authenticationCallback?.({ userId, userData })

    await setUserExpenses({ userId })
  } catch (error) {
    if (error?.message === ERRORS["NO_CREDENTIALS"])
      handleNoCredentialsError({ error })

    throw new Error(error?.message)
  }
}

export async function setUserExpenses({ userId }) {
  const userExpenses = await handleGetUserExpenses({ userId })

  expenses.set(userExpenses)
}

async function handleNoCredentialsError({ error }) {}
