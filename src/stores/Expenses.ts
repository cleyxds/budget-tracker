import { create } from "zustand"

export type TExpense = {
  id: string
  name: string
  price: number | string
  priceSpent: number | string
  date: string
  createdAt: number
  isCompleted: boolean
  isRecurrent: boolean
  isOffline: boolean
}

type TExpenses = {
  syncModalOpen: boolean
  userExpenses: TExpense[]
}

const DEFAULT_STATE: TExpenses = {
  syncModalOpen: false,
  userExpenses: []
}

type TExpensesStore = {
  expenses: TExpenses
  setExpenses: (expenses: TExpense[]) => void
  addExpenses: (expense: TExpense) => void
  clearExpensesStore: () => void
  getAnonymousExpenses: () => TExpense[]
  toggleSyncModal: (value: boolean) => void
}

export const useExpensesStore = create<TExpensesStore>((set, get) => ({
  expenses: DEFAULT_STATE,
  toggleSyncModal: value =>
    set(state => {
      function updateSyncModal(): TExpenses {
        const { syncModalOpen: oldSyncModalState, ...rest } = state.expenses

        return {
          syncModalOpen: value,
          ...rest
        }
      }

      return {
        ...state,
        expenses: updateSyncModal()
      }
    }),
  setExpenses: expenses =>
    set(state => {
      function getUpdatedExpenses(): TExpenses {
        const { userExpenses: oldExpenses, ...rest } = state.expenses

        return {
          userExpenses: expenses,
          ...rest
        }
      }

      return {
        ...state,
        expenses: getUpdatedExpenses()
      }
    }),
  clearExpensesStore: () =>
    set(state => ({ ...state, expenses: DEFAULT_STATE })),
  addExpenses: expense =>
    set(state => {
      function getUpdatedExpenses(): TExpenses {
        const { userExpenses: oldExpenses, ...rest } = state.expenses

        const clone = [...oldExpenses]

        clone.push(expense)

        return {
          userExpenses: clone,
          ...rest
        }
      }

      return {
        ...state,
        expenses: getUpdatedExpenses()
      }
    }),
  getAnonymousExpenses: () => {
    const { expenses } = get()
    const { userExpenses } = expenses

    function filterByAnonymousExpenses(item: TExpense) {
      return !!item?.isOffline
    }

    return userExpenses?.filter(filterByAnonymousExpenses)
  }
}))
