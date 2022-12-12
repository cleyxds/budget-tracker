<script>
  const doSomething = () => {
    alert("Click on button")
  }
</script>

<style>
  header {
    position: sticky;
    display: flex;
    top: 0;
    width: 100%;
    background-color: white;
    margin-top: 112px;
    padding: 0 32px;
  }
</style>

<header>
  <h1>BTracker</h1>
  <button on:click={doSomething}>Log in</button>
</header>
