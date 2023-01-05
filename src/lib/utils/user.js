import { getDoc } from "firebase/firestore"

import { userDoc } from "../../services/firebase"

export async function getUserData({ userId }) {
  const user = await (await getDoc(userDoc(userId))).data()

  return {
    monthlyBudget: user?.monthlyBudget,
    spendThisMonth: user?.spendThisMonth,
  }
}
