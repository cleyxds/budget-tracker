import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { collection, doc, getFirestore } from "firebase/firestore"

import { firebaseConfig } from "../../firebase.config.js"

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

const userDoc = (userId) => doc(db, "users", userId)
const expenseDoc = (expenseId) => doc(db, "expense", expenseId)

const expensesCollection = collection(db, "expenses")

export { auth, userDoc, expensesCollection, expenseDoc }
