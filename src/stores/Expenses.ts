import { create } from "zustand"

const DEFAULT_STATE = []

export const useExpensesStore = create(set => ({
  expenses: DEFAULT_STATE,
  setExpenses: expenses =>
    set(state => ({
      ...state,
      expenses
    })),
  clearExpenses: () => set(state => ({ ...state, expenses: DEFAULT_STATE }))
}))
