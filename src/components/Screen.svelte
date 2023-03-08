<main class="screenContainer">
  <slot />
</main>

<style>
  .screenContainer {
    min-height: calc(100vh - var(--navbar-height));
  }
</style>
