<script>
  import Screen from "../components/Screen.svelte"
  import NavBar from "../components/NavBar.svelte"
  import Landing from "../components/Landing/Landing.svelte"
  import Expenses from "../components/Expenses/Expenses.svelte"

  import { authentication } from "../stores/authentication"

  let className

  authentication.subscribe(({ isAuthenticated }) => {
    if (!isAuthenticated) {
      className = "landingContainer unautheneticatedContainer"
      return
    }

    className = "landingContainer"
  })
</script>

<Screen>
  <div class={className}>
    <Landing />

    <Expenses />
  </div>
</Screen>

<NavBar />

<style>
  .landingContainer {
    display: flex;
    flex-direction: column;
  }

  .unautheneticatedContainer {
    padding: 0 36px;
  }
</style>
