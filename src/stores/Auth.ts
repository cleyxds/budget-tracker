import { create } from "zustand"

const DEFAULT_STATE = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  userId: null
}

export const useAuthStore = create(set => ({
  auth: DEFAULT_STATE,
  setAuth: auth =>
    set(state => ({
      ...state,
      auth
    })),
  clearAuth: () => set(state => ({ ...state, auth: DEFAULT_STATE }))
}))
