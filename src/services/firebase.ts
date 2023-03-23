import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

import FIREBASE_CONFIG from "../../firebase.config.json"

// Initialize Firebase and Firestore
const app = initializeApp(FIREBASE_CONFIG)

const db = getFirestore(app)

export { db }
