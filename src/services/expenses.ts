import Cookies from "js-cookie"

import { TExpense } from "../stores/Expenses"

import { expenseCollection } from "./firebase"
import { addDoc } from "firebase/firestore"

const ANONYMOUS_ID = "anonymous_expenses"

async function getAnonymousExpenses() {
  try {
    const expenses = Cookies.get(ANONYMOUS_ID) ?? []

    if (!expenses?.length) return []

    const data: TExpense[] = JSON.parse(expenses)

    return data
  } catch (error) {
    console.warn(error)
    throw new Error(error)
  }
}

async function createAnonymousExpense(expense: TExpense) {
  try {
    const expenses: TExpense[] = []

    const anonymousExpenses = await getAnonymousExpenses()

    anonymousExpenses?.forEach(anonymousExpense => {
      expenses.push(anonymousExpense)
    })

    expenses.push(expense)

    const data = JSON.stringify(expenses)

    Cookies.set(ANONYMOUS_ID, data, { expires: 30, sameSite: "lax" })
  } catch (error) {
    throw new Error(error)
  }
}

async function updateAnonymousExpenses(expenses: TExpense[]) {
  const data = JSON.stringify(expenses)

  Cookies.set(ANONYMOUS_ID, data, { expires: 30, sameSite: "lax" })
}

async function deleteAnonymousExpense(expenseId: string) {
  function appyExpenseIdFilter(item) {
    return item?.id !== expenseId
  }

  try {
    const anonymousExpenses = await getAnonymousExpenses()

    const expenses = anonymousExpenses?.filter(appyExpenseIdFilter)

    const data = JSON.stringify(expenses)

    Cookies.set(ANONYMOUS_ID, data, { expires: 30, sameSite: "lax" })
  } catch (error) {
    throw new Error(error)
  }
}

async function createExpense(expense: TExpense) {
  try {
    const { id, ...expenseRest } = expense

    const expenseRef = await addDoc(expenseCollection, expenseRest)

    const expenseId = expenseRef?.id

    console.log({ message: "createExpense", expenseRef, expenseId })
    return expenseId
  } catch (error) {
    throw new Error(error)
  }
}

export const expensesActions = {
  createExpense
}

export const anonymousActions = {
  getAnonymousExpenses,
  createAnonymousExpense,
  updateAnonymousExpenses,
  deleteAnonymousExpense
}
