import { getDoc } from "firebase/firestore"

import { userDoc } from "./firebase"

import expensesUtils from "../utils/expensesUtils"
import getMonthDate from "../utils/getMonthDate"

async function getUserData(userId) {
  const user = await getDoc(userDoc(userId))

  return { userId, ...user?.data() }
}

async function getUserExpenses(userId: string, date?: string) {
  let yearMonth = getMonthDate()

  if (date) {
    yearMonth = date
  }

  try {
    const expenses = await expensesUtils.getAllExpenses(userId, yearMonth)

    return expenses
  } catch (error) {
    console.error(error)

    return []
  }
}

export const userActions = {
  getUserData,
  getUserExpenses
}
