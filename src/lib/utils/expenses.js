import {
  addDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  updateDoc,
  where,
} from "firebase/firestore"

import {
  expensesCollection,
  expenseCollection,
  expenseDoc,
  expensesDoc,
} from "../../services/firebase"

export const EDIT_EXPENSE_TYPES = {
  MAX_PRICE: "MAX_PRICE",
  PRICE: "PRICE",
}

const EXPENSE_PRICE_FIELDS = {
  MAX_PRICE: "maxPrice",
  PRICE: "price",
}

import { setUserExpenses as refetchUserExpenses } from "./user"

export async function handleAddExpenses({}) {
  alert("Pelé é o melhor!")
}

export async function handleAddExpense({ event, expensesId, userId, onEnd }) {
  const formData = new FormData(event?.target)

  const formdata = {}
  for (let field of formData) {
    const [key, value] = field
    formdata[key] = value
  }

  try {
    const expenseRef = await addDoc(expenseCollection, {
      maxPrice: Number(formdata?.price),
      name: formdata?.title,
      price: 0,
    })

    const expenseId = expenseRef?.id

    await updateExpensesById({ expenseId, expensesId })
  } catch (error) {
    console.error(error)
  } finally {
    await refetchUserExpenses({ userId })
    await onEnd()
  }
}

export async function handleEditExpense({
  type = EDIT_EXPENSE_TYPES.MAX_PRICE,
  userId,
  value,
  expenseId,
}) {
  try {
    if (type === EDIT_EXPENSE_TYPES.MAX_PRICE) {
      await updateDoc(expenseDoc(expenseId), {
        [EXPENSE_PRICE_FIELDS.MAX_PRICE]: Number(value),
      })

      return
    }

    if (type === EDIT_EXPENSE_TYPES.PRICE) {
      await updateDoc(expenseDoc(expenseId), {
        [EXPENSE_PRICE_FIELDS.PRICE]: Number(value),
      })

      return
    }
  } catch (error) {
    console.warn(error)
  } finally {
    await refetchUserExpenses({ userId })
  }
}

export async function handleDeleteExpense({ expenseId, expensesId, userId }) {
  try {
    await deleteDoc(expenseDoc(expenseId))

    await updateDoc(expensesDoc(expensesId), {
      expenseId: arrayRemove(expenseId),
    })
  } catch (error) {
    console.error(error)
  } finally {
    await refetchUserExpenses({ userId })
  }
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
          ?.map((item) => item?.price)
          ?.reduce((previous, current) => previous + current, 0),
      }
    })

    return refinedResult
  } catch (error) {
    console.error(error)

    return []
  }
}

export async function getExpensesByMonth({ month }) {
  return console.log(`getting expenses for ${month}`)
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
      const real = refinedResponse?.map((item) => ({
        ...item?.data(),
        id: item?.id,
      }))

      return real
    })

    return await Promise?.all(data)
  } catch (error) {
    console.error(error)

    return []
  }
}

async function updateExpensesById({ expensesId, expenseId }) {
  await updateDoc(expensesDoc(expensesId), {
    expenseId: arrayUnion(expenseId),
  })
}
