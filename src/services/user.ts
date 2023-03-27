import { getDoc, updateDoc } from "firebase/firestore"

import { userDoc } from "./firebase"

export async function getUserData(userId) {
  const user = await getDoc(userDoc(userId))

  return user?.data()
}
