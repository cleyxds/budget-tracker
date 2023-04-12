import { TExpense } from "../stores/Expenses"

import { getDocs, query, where } from "firebase/firestore"

import { expenseCollection } from "../services/firebase"

async function getAllExpenses(
  userId: string,
  date: string
): Promise<TExpense[]> {
  const expensesByMonthQuery = query(
    expenseCollection,
    where("userId", "==", userId),
    where("date", "==", date)
  )

  try {
    const querySnapshotExpenses = await getDocs(expensesByMonthQuery)

    const expenses: TExpense[] & any = querySnapshotExpenses.docs.map(expense =>
      expense?.data()
    )

    return expenses
  } catch (error) {
    return []
  }
}

export default {
  getAllExpenses
}
