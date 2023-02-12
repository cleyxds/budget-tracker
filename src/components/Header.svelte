<script>
  import Logo from "../assets/icons/Logo.svelte"

  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from "@rgossiaux/svelte-headlessui"

  import AddFilled from "carbon-icons-svelte/lib/AddFilled.svelte"

  import CreateExpense from "./Expenses/components/CreateExpense.svelte"

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
      <Popover
        style="position: relative;display: flex;justify-content: flex-end;"
      >
        <PopoverButton as="div">
          <div
            on:keydown={() => {}}
            on:click={rightComponent?.actions?.[0]}
            class="iconContainer"
          >
            <AddFilled />
          </div>
        </PopoverButton>

        <PopoverPanel
          let:close
          style="position: absolute; z-index: 9999; margin-top: 3rem;"
        >
          <CreateExpense {close} />
        </PopoverPanel>
      </Popover>
    {/if}
  </div>
</header>

<style>
  .iconContainer {
    display: flex;
    align-items: center;

    padding: 0.8rem;
    margin-right: -0.8rem;

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
