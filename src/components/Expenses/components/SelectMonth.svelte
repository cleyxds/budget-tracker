<script>
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from "@rgossiaux/svelte-headlessui"

  import { month as currentMonth } from "../../../stores/month"

  import { getExpensesByMonth } from "../../../lib/utils/expenses"

  function handleSelectMonth({ month }) {
    currentMonth.set(month)
  }

  currentMonth.subscribe(async (month) => {
    await getExpensesByMonth({ month })
  })

  let availableMonths = [
    "October 2022",
    "November 2022",
    "December 2022",
    "January 2023",
  ]
</script>

<Menu as="div" class="wrapper">
  <MenuButton let:open class="theText monthlyExpensesContainer" as="h1"
    >{$currentMonth}</MenuButton
  >

  <MenuItems class="monthlyExpensesPopover">
    {#each availableMonths as month}
      <MenuItem>
        <p
          on:keydown={() => {}}
          on:click={() => handleSelectMonth({ month })}
          style="margin-top: 1rem;"
        >
          {month}
        </p>
      </MenuItem>
    {/each}
  </MenuItems>
</Menu>

<style>
  :global(.wrapper) {
    display: flex;
    justify-content: center;

    margin-top: 1rem;
  }

  :global(.monthlyExpensesContainer) {
    cursor: pointer;

    display: flex;
    align-items: center;
  }

  :global(.theText) {
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }

  :global(.monthlyExpensesPopover) {
    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    min-width: 140px;

    margin-top: 2rem;
    padding: 0 1rem 1rem 1rem;

    border-radius: 8px;

    background-color: var(--light-background);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    border: 1px solid var(--white-II);
  }

  :global(.monthlyExpensesPopover p:hover) {
    opacity: 0.7;
    cursor: pointer;
  }
</style>
