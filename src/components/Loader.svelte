<script>

  const DEFAULT_SIZE = 48

  export let size = DEFAULT_SIZE
  let spinnerSize = DEFAULT_SIZE * 0.8333333

</script>

<style>
  .loader {
    width: 23.34px;
    height: 23.34px;
    border: 3px solid var(--dark-background);
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after {
    content: '';  
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 19.45px;
    height: 19.45px;
    border-radius: 50%;
    border: 3px solid;
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

<span class="loader"></span>
