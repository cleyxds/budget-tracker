<script>

  import { authentication } from "../stores/authentication"

</script>

<style>
  div {
    max-width: 80%;
  }

  h1 {
    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 4rem;
    line-height: 58px;
  }
</style>

{#if !$authentication.isAuthenticated}
  <div>
    <h1>
      Never struggle on your finances again
    </h1>
  </div>
{/if}