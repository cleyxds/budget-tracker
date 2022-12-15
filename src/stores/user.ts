import { writable } from "svelte/store"

export const DEFAULT_USER = {
  id: null,
  name: null,
}

export const user = writable(DEFAULT_USER)
