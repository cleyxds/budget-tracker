<script>
  const DEFAULT_SIZE = 24

  export let size = DEFAULT_SIZE
</script>

<span
  class="loader sizeAdjust"
  style:width={`${size}px`}
  style:height={`${size}px`}
/>

<style>
  .loader {
    width: 23.34px;
    height: 23.34px;
    border: 3px solid var(--dark-background);
    border-radius: 9999px;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 105%;
    height: 100%;
    border-radius: 9999px;
    border: 2px solid;
    border-color: var(--expense-primary) transparent;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
