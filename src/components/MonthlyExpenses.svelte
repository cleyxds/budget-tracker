<script>

  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from "@rgossiaux/svelte-headlessui";
  
  import ArrowDown from "../assets/icons/ArrowDown.svelte"

  function handleSelectMonth({month}) {
    selectedMonth = month
  }

  let availableMonths = [
    "October 2022",
    "November 2022",
    "December 2022"
  ]

  let selectedMonth = "December 2022"

</script>

<style>
  :global(.monthlyExpensesContainer) {
    cursor: pointer;
  
    display: flex;
    align-items: center;
  
    margin-top: 16px;
  }

  /* :global(.monthlyExpensesContainer p) { */
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

    min-width: 140px;
    padding: 0 1rem 1rem 1rem;
    border-radius: 12px;

    background-color: var(--gray-II);
    z-index: 10;
  }
</style>

<Menu>
  <MenuButton class="theText monthlyExpensesContainer" as="h1">{selectedMonth}</MenuButton>

  <MenuItems class="monthlyExpensesPopover">
    <MenuItem let:active>
      <a href="/account-settings" class:active>Account settings</a>
    </MenuItem>
    <MenuItem let:active>
      <a href="/documentation" class:active>Documentation</a>
    </MenuItem>
    <MenuItem disabled>
      <span class="disabled">Invite a friend (coming soon!)</span>
    </MenuItem>
  </MenuItems>
</Menu>

