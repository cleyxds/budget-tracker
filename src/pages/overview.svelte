<script>

  import Screen from '../components/Screen.svelte'
  import NavBar from "../components/NavBar.svelte"
  import Header from '../components/Header.svelte'

</script>

<style>
  h1 {
    margin-top: 1rem;

    padding: 0 2rem;

    font-family: "DM Sans", sans-serif;
  }
</style>

<Screen>
  <Header />
  <h1>Overview page</h1>
</Screen>

<NavBar />
