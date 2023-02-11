<script>
  import Logo from "../assets/icons/Logo.svelte"
  import PlusIcon from "../assets/icons/PlusIcon.svelte"

  export let leftComponent = { type: "" }
  export let middleComponent = { title: "" }
  export let rightComponent = { type: "", actions: [] }
</script>

<header>
  <div class="leftContainer">
    {#if leftComponent?.type === "logo"}
      <Logo />
    {/if}
  </div>

  <div class="middleContainer">
    {#if !!middleComponent?.title}
      {middleComponent.title}
    {/if}
  </div>

  <div class="rightContainer">
    {#if rightComponent?.type === "add"}
      <div
        on:keydown={() => {}}
        on:click={rightComponent?.actions?.[0]}
        class="iconContainer"
      >
        <PlusIcon />
      </div>
    {/if}
  </div>
</header>

<style>
  .iconContainer {
    display: inherit;
    align-items: center;
    padding: 10px;

    cursor: pointer;
  }

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 48px;

    margin: 1rem 2rem 0px 2rem;
    padding: 0 20px;

    font-family: "DM Sans", sans-serif;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;

    background-color: var(--light-background);
    color: var(--black-II);
  }

  .leftContainer {
    display: flex;
    flex: 1;
    justify-content: flex-start;

    color: var(--gray-I);
  }

  .middleContainer {
    display: flex;
    justify-content: center;
    flex: 1;
    padding: 0 8px;
    text-align: center;
  }

  .rightContainer {
    display: flex;
    justify-content: flex-end;
    flex: 1;
  }
</style>
