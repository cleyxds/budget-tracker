<script>
  export let size = 24
</script>

<div class="iconContainer" style:width={size} style:height={size}>
  <slot {size} />
</div>

<style>
  .iconContainer {
    background-color: var(--dark-background);
    opacity: 0.5;
    border-radius: 9999px;
  }
</style>
