<script>
  import LandingTitle from "./LandingTitle.svelte"
  import LandingFeatures from "./LandingFeatures.svelte"

  import { authentication } from "../../stores/authentication"
</script>

{#if !$authentication.isAuthenticated}
  <div class="container">
    <div class="landingHeader">
      <h1>BTracker.</h1>
    </div>

    <LandingTitle />

    <LandingFeatures />
  </div>
{/if}

<style>
  .landingHeader {
    display: flex;
    flex: 1;

    margin: 2rem 2rem 0 0;
  }

  .landingHeader h1 {
    font-family: "Azeret Mono", monospace;
    font-weight: 800;
    font-size: 2rem;
  }

  .leftMargin {
    margin-left: 1rem;
  }

  .container {
    display: flex;
    flex-direction: column;
    max-width: 100%;
  }
</style>
