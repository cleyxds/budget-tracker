<script>

  import { url } from '@roxi/routify'

  import OverviewIcon from "../assets/icons/Overview.svelte"
  import CalendarIcon from "../assets/icons/Calendar.svelte"

  import { authentication } from "../stores/authentication"

</script>

<style>
  .navBarContainer {
    position: sticky;
    bottom: 0px;
    
    display: flex;
    background-color: #FCFCFD;
    height: var(--navbar-height);
  }

  .navBarContainer a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    color: #AEABC2;

    height: 100%;
    width: calc(100vw - 103.5px);
  }

  .navBarContainer a[type=selected] {
    color: #6347EB;
  }

  .navBarContainer a svg {
    margin-bottom: 8px;
  }
  
</style>

<footer class="navBarContainer">
  <a href={$url('./')}>
    <OverviewIcon />
    Expenses
  </a>
  <a href={$url('./overview')} type="selected">
    <CalendarIcon />
    This Month
  </a>

  {#if $authentication.isAuthenticated}
    <a href={$url('./profile')}>
      <OverviewIcon />
      Credit score
    </a>
  {/if}
</footer>
