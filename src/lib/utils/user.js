import Cookies from "js-cookie"

import { getDoc, updateDoc } from "firebase/firestore"

import { expenses } from "../../stores/expenses"
import { user } from "../../stores/user"

import { userDoc } from "../../services/firebase"
import { handleGetUserExpenses } from "./expenses"

import { ERRORS } from "../constants/errors"
import { CURRENCIES } from "../constants/currencies"

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

async function refetchUserData({ userId }) {
  const data = await getDoc(userDoc(userId))
  const userData = data?.data()

  user.set(userData)
}

export async function handleUpdateUserMonthlyBudget({ userId, monthlyBudget }) {
  try {
    await updateDoc(userDoc(userId), {
      monthlyBudget: Number(monthlyBudget),
    })
  } catch (error) {
    console.warn(error)
  } finally {
    await refetchUserData({ userId })
  }
}

export function getCurrency(currency) {
  return CURRENCIES[currency]
}
