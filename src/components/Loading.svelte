<script>
  export let loading
  export let message
</script>

<style>
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: var(--dark-background);
    opacity: 1;
  }

  .alignment {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .messageContent {
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;

    color: var(--white-I);
  }

  .commonMargin {
    margin-top: 1rem;
  }

  .loader {
    width: 48px;
    height: 48px;
    border: 3px solid var(--white-II);
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid;
    border-color: var(--expense-primary) var(--transparent);
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

{#if loading}
  <div class="overlay alignment contentContainer">
    <h1 class="messageContent">{message}</h1>

    <span class="loader commonMargin" />
  </div>
{/if}