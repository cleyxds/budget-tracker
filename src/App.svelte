<script>

  import { onMount } from "svelte"

  import { Router } from "@roxi/routify"
  import { routes } from "../.routify/routes"

  import Loading from "./components/Loading.svelte"
  
  import { authentication } from "./stores/authentication"
  import { user } from "./stores/user"

  import { getInitialUserData } from "./lib/utils/user"
  import { expenses } from "./stores/expenses"

  import "carbon-components-svelte/css/white.css"

  let loading = false

  function initialAuthenticationCallback({ userId, userData }) {
    authentication.update(state => ({
      ...state,
      isAuthenticated: !state?.isAuthenticated
    }))

    if ($authentication.isAuthenticated) {
      user.update(state => ({
        ...state,
        id: userId,
        ...userData,
      }))
    }
  }

  function authenticationCallback({ userId, userData }) {
    if ($authentication.isAuthenticated) {
      user.update(state => ({
        ...state,
        id: userId,
        ...userData,
      }))
    }
  }

  async function bootstrap() {
    try {
      loading = true

      await getInitialUserData({ authenticationCallback: initialAuthenticationCallback })
    } catch (error) {

    } finally {
      loading = false
    }

  }

  authentication.subscribe(async (data) => {
    if (data.isAuthenticated) {
      await getInitialUserData({ authenticationCallback })
    }

    if (!data?.isAuthenticated) {
      user.set({ id: null, username: null })
      expenses.set([])
    }
  })

  user.subscribe((data) => {
    if (!data?.username) return

    document.title = `BTracker | ${data?.username}`
  })

  onMount(async () => await bootstrap())

</script>

<Router routes={routes} />

<Loading message="Loading user" loading={loading} />
