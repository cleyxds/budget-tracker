<script>

  import Screen from "../components/Screen.svelte"
  import NavBar from "../components/NavBar.svelte"

  import Cookies from 'js-cookie'

  import { authentication } from "../stores/authentication"
  import { user, DEFAULT_USER } from "../stores/user"

  async function handleLogout() {
    try {
      Cookies.remove('JSESSIONID')

      authentication.update(state => ({
        ...state,
        isAuthenticated: false
      }))
  
      if (!$authentication.isAuthenticated) {
        user.set(DEFAULT_USER)
        return
      }
      
    } catch (error) {
      console.warn(error)
    }
  }

</script>

<Screen>
  <button on:click={handleLogout}>
    Log out
  </button>
</Screen>

<NavBar />
