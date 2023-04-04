import Cookies from "js-cookie"

const ANONYMOUS_ID = "anonymous_expenses"

async function getAnonymousExpenses() {
  try {
    const expenses = Cookies.get(ANONYMOUS_ID) ?? []

    const data = JSON.parse(expenses)

    return data
  } catch (error) {
    console.warn(error)
    throw new Error(error)
  }
}

async function createAnonymousExpense(expense) {
  try {
    const expenses = []

    const anonymousExpenses = await getAnonymousExpenses()

    anonymousExpenses?.forEach(anonymousExpense => {
      expenses.push(anonymousExpense)
    })

    expenses.push(expense)

    const data = JSON.stringify(expenses)

    Cookies.set(ANONYMOUS_ID, data, { expires: 30, sameSite: "Lax" })
  } catch (error) {
    throw new Error(error)
  }
}

export const anonymousActions = {
  getAnonymousExpenses,
  createAnonymousExpense
}
