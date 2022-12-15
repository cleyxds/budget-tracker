<script>

  import NavBar from "../components/NavBar.svelte"

  import {authentication} from "../stores/authentication"
  import { user, DEFAULT_USER } from "../stores/user"

  function handleLogin() {
    authentication.update(state => ({
      ...state,
      isAuthenticated: !state?.isAuthenticated
    }))

    if (!$authentication.isAuthenticated) {
      user.set(DEFAULT_USER)
      return
    }

    if ($authentication.isAuthenticated) {
      user.update(state => ({
        ...state,
        id: "1",
        name: "Cleyson"
      }))

      return
    }
  }

</script>

<style>
  main {
    min-height: calc(100vh - var(--navbar-height));
  }
</style>

<main>
  <h1>Overview</h1>

  <button on:click={handleLogin}>
    Log in
  </button>
</main>

<NavBar />

