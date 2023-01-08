import { writable } from "svelte/store"

export const DEFAULT_USER = {
  id: null,
  username: null,
}

export const user = writable(DEFAULT_USER)
