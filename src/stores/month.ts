import { writable } from "svelte/store"

import { MONTHS } from "../constants"
import { formatDecimal, getMonthDate } from "../lib/utils/expenses"

const date = getMonthDate()

const [monthIndex, year] = date?.split("/")

const currentMonth = MONTHS[Number(monthIndex) - 1]

export const month = writable({
  textDate: `${currentMonth} ${year}`,
  date: `${formatDecimal(Number(monthIndex))}/${year}`,
})
