import { writable } from "svelte/store"

import { MONTHS } from "../constants"

const now = new Date()
const monthIndex = now?.getUTCMonth()
const currentMonth = MONTHS[monthIndex]
const year = now?.getUTCFullYear()

export const month = writable(`${currentMonth} ${year}`)
