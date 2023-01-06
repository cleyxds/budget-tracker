import { getDoc } from "firebase/firestore"

import { userDoc } from "../../services/firebase"

export async function getUserData({ userId }) {
  const userRef = await getDoc(userDoc(userId))
  const user = userRef?.data()

  return {
    monthlyBudget: user?.monthlyBudget,
    spendThisMonth: user?.spendThisMonth,
  }
}
