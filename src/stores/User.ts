import { create } from "zustand"

const DEFAULT_STATE = null

export const useUserStore = create(set => ({
  user: DEFAULT_STATE,
  setUser: user => set(state => ({ ...state, user })),
  clearUser: () => set(state => ({ ...state, user: DEFAULT_STATE }))
}))
