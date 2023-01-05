import { getDoc, getDocs, query, where } from "firebase/firestore"
import { expensesCollection, expenseDoc } from "../../services/firebase"

export async function handleAddExpense({}) {
  alert("Pelé é o melhor!")
}

export async function handleGetUserExpenses({ userId }) {
  try {
    const expenses = await getExpenses({ userId })
    const arrayExpenseId = expenses?.map((item) => item?.expenseId)

    const expense = await getAllExpense({ expensesId: arrayExpenseId })

    const refinedResult = expenses?.map((item, index) => {
      const { expenseId, ...properties } = item

      const expensesAtItem = expense?.[index]

      return {
        ...properties,
        expenses: expensesAtItem,
        total: expensesAtItem
          ?.map((item) => item?.maxPrice)
          ?.reduce((previous, current) => previous + current, 0),
      }
    })

    return refinedResult
  } catch (error) {
    console.error(error)

    return []
  }
}

async function getExpenses({ userId }) {
  try {
    const queryExpenses = query(
      expensesCollection,
      where("userId", "==", userId)
    )
    const querySnapshotExpenses = await getDocs(queryExpenses)

    const expenses = querySnapshotExpenses.docs.map((expense) => ({
      ...expense?.data(),
      id: expense?.id,
    }))

    return expenses
  } catch (error) {
    console.error(error)

    return []
  }
}

async function getAllExpense({ expensesId }) {
  try {
    const data = expensesId?.map(async (item) => {
      const response = item?.map(async (item) => {
        const data = await getDoc(expenseDoc(item))

        return data
      })

      const refinedResponse = await Promise.all(response)
      const real = refinedResponse?.map((item) => item?.data())

      return real
    })

    return await Promise?.all(data)
  } catch (error) {
    console.error(error)

    return []
  }
}
