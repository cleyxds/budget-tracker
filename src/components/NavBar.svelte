<script>

  import { url } from '@roxi/routify'

  import OverviewIcon from "../assets/icons/Overview.svelte"
  import CalendarIcon from "../assets/icons/Calendar.svelte"
  import SettingsIcon from "../assets/icons/Settings.svelte"

  import { authentication } from "../stores/authentication"

  let route = window.location.pathname

  const NOT_AUTHENTICATED_ROUTES = [
    {
      name: "Expenses",
      route: "/",
      icon: "OverviewIcon"
    },
    {
      name: "Overview",
      route: "/overview",
      icon: "CalendarIcon"
    },
  ]

  let availableTabs = NOT_AUTHENTICATED_ROUTES

  authentication.subscribe(({isAuthenticated}) => {
		if (isAuthenticated) {
      availableTabs = [...availableTabs, {
        name: "Credit score",
        route: "/profile",
        icon: "SettingsIcon"
      }]

      return
    }

    if (!isAuthenticated) {
      availableTabs = NOT_AUTHENTICATED_ROUTES
    }
	})

</script>

<style>
  .navBarContainer {
    position: sticky;
    bottom: 0px;
    
    display: flex;

    height: var(--navbar-height);

    background-color: var(--light-background);
    
    box-shadow: 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%), 0px 3px 5px -1px rgb(0 0 0 / 20%);
  }

  .navBarContainer a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;

    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    color: var(--gray-II);

    height: 100%;
    width: calc(100vw - 103.5px);
  }

  .navBarContainer a[type=selected] {
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;

    color: var(--black-I)
  }

  .navBarContainer a svg {
    margin-bottom: 8px;
  }
  
</style>

<footer class="navBarContainer">
  {#each availableTabs as tab}
    <a href={$url(tab?.route)} type={tab?.route === route ? "selected": null}>
      {#if tab.icon === "OverviewIcon"}
        <OverviewIcon selected={tab?.route === route} />
      {/if}

      {#if tab.icon === "CalendarIcon"}
        <CalendarIcon selected={tab?.route === route} />
      {/if}

      {#if tab.icon === "SettingsIcon"}
        <SettingsIcon selected={tab?.route === route} />
      {/if}
      {tab?.name}
    </a>
  {/each}
</footer>
