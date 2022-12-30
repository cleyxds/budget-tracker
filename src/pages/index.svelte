<script>

  import Screen from "../components/Screen.svelte"
  import NavBar from "../components/NavBar.svelte"
  import Landing from "../components/Landing.svelte"
  import Expenses from "../components/Expenses.svelte"

  import { authentication } from '../stores/authentication';
  import Header from "../components/Header.svelte"
  
  let className
  
  authentication.subscribe(({isAuthenticated}) => {
		if (!isAuthenticated) {
      className = "landingContainer unautheneticatedContainer"
      return
    }

    className = "landingContainer"
	})
</script>

<style>
  .landingContainer {
    display: flex;
    flex-direction: column;
  }

  .unautheneticatedContainer {
    padding: 0 36px;
  }
  
</style>

<Screen>
  <Header />

  <div class={className}>
    <Landing />
  
    <Expenses />
  </div>
</Screen>

<NavBar />
