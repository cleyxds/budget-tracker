<script>

  export let progress = 0
  export let color = `var(--dark-background)`

</script>

<style>
  .progress {
    background-color: var(--white-II);
    height: 8px;
    width: 100%;
    border-radius: 9999px;
    overflow: hidden;
  }

  .fill {
    background-size: 5px;
    border-radius: 5px;
    background-color: var(--dark-background);
    height: 100%;
    transition: width 0.7s linear;
  }
</style>

<div class="progress">
  <div class="fill" style:width={`${progress}%`} style:background-color={color} />
</div>