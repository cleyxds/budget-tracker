import { writable } from "svelte/store"

export const authentication = writable({ isAuthenticated: false })
