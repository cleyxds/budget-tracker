<script>

  import NavBar from "../components/NavBar.svelte"

</script>

<style>
  main {
    min-height: calc(100vh - var(--navbar-height));
  }

  main h1 {
    color: var(--white)
  }
</style>

<main>
  <h1>Overview</h1>
</main>

<NavBar />

