<script>

  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from "@rgossiaux/svelte-headlessui";

  function handleSelectMonth({ month }) {
    selectedMonth = month    
  }

  let availableMonths = [
    "October 2022",
    "November 2022",
    "December 2022",
    "January 2023"
  ]

  let selectedMonth = "January 2023"

</script>

<style>
  :global(.monthlyExpensesContainer) {
    cursor: pointer;
  
    display: flex;
    align-items: center;
  
    margin-top: 16px;
  }

  :global(.theText) {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    
    margin-right: 4px;
    margin-bottom: 4px;
  }

  :global(.monthlyExpensesPopover) {
    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    min-width: 140px;

    margin-top: 1rem;
    padding: 0 1rem 1rem 1rem;

    border-radius: 8px;
    
    background-color: var(--light-background);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    transform: translateX(-25%);
  }

  :global(.monthlyExpensesPopover p:hover) {
    opacity: .7;
    cursor: pointer;
  }
</style>

<Menu>
  <MenuButton let:open class="theText monthlyExpensesContainer" as="h1">{selectedMonth}</MenuButton>

  <MenuItems class="monthlyExpensesPopover">
    {#each availableMonths as month}
      <MenuItem>
        <p on:keydown={() => {}} on:click={() => handleSelectMonth({month})} style="margin-top: 1rem;">
          {month}
        </p>
      </MenuItem>
    {/each}

  </MenuItems>
</Menu>

