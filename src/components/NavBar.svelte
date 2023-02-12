<script>
  import { url } from "@roxi/routify"

  import OverviewIcon from "../assets/icons/Overview.svelte"

  import Dashboard from "carbon-icons-svelte/lib/Dashboard.svelte"
  import Settings from "carbon-icons-svelte/lib/Settings.svelte"
  import Calendar from "carbon-icons-svelte/lib/Calendar.svelte"
  import TwoFactorAuthentication from "carbon-icons-svelte/lib/TwoFactorAuthentication.svelte"
  import ChartHistogram from "carbon-icons-svelte/lib/ChartHistogram.svelte"

  import { authentication } from "../stores/authentication"
  import { month } from "../stores/month"

  let route = window.location.pathname

  const NOT_AUTHENTICATED_ROUTES = [
    {
      name: "Visão geral",
      route: "/",
      icon: "DashboardIcon",
    },
    {
      name: "Gráficos",
      route: "/overview",
      icon: "ChartIcon",
    },
    {
      name: "Conta",
      route: "/login",
      icon: "AuthIcon",
    },
  ]

  let currentMonth = $month
  month.subscribe((currMonth) => {
    currentMonth = currMonth
  })

  const AUTHENTICATED_ROUTES = [
    {
      name: "Visão geral",
      route: "/",
      icon: "DashboardIcon",
    },
    {
      name: "Esse mês",
      route: `/month/${currentMonth?.replace(/ /g, "")}`,
      icon: "CalendarIcon",
    },
    {
      name: "Gráficos",
      route: "/overview",
      icon: "ChartIcon",
    },
    {
      name: "Configurações",
      route: "/settings",
      icon: "SettingsIcon",
    },
  ]

  let availableTabs = NOT_AUTHENTICATED_ROUTES

  authentication.subscribe(({ isAuthenticated }) => {
    if (isAuthenticated) {
      availableTabs = AUTHENTICATED_ROUTES
      return
    }

    if (!isAuthenticated) {
      availableTabs = NOT_AUTHENTICATED_ROUTES
    }
  })
</script>

<footer class="navBarContainer">
  {#each availableTabs as tab}
    <a href={$url(tab?.route)} type={tab?.route === route ? "selected" : null}>
      {#if tab.icon === "OverviewIcon"}
        <OverviewIcon selected={tab?.route === route} />
      {/if}

      {#if tab.icon === "CalendarIcon"}
        <Calendar size={24} />
      {/if}

      {#if tab.icon === "SettingsIcon"}
        <Settings size={24} />
      {/if}

      {#if tab.icon === "DashboardIcon"}
        <Dashboard size={24} />
      {/if}

      {#if tab.icon === "AuthIcon"}
        <TwoFactorAuthentication size={24} />
      {/if}

      {#if tab.icon === "ChartIcon"}
        <ChartHistogram size={24} />
      {/if}

      <p>
        {tab?.name}
      </p>
    </a>
  {/each}
</footer>

<style>
  .navBarContainer {
    position: sticky;
    bottom: 0px;

    display: flex;

    height: var(--navbar-height);

    background-color: var(--light-background);

    box-shadow: 0px 6px 10px 0px rgb(0 0 0 / 14%),
      0px 1px 18px 0px rgb(0 0 0 / 12%), 0px 3px 5px -1px rgb(0 0 0 / 20%);
  }

  .navBarContainer a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;

    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    color: var(--gray-II);

    height: 100%;
    width: calc(100vw - 103.5px);
  }

  .navBarContainer a[type="selected"] {
    font-family: "DM Sans", sans-serif;
    font-weight: 700;

    color: var(--black-I);
  }

  .navBarContainer a p {
    text-align: center;
  }
</style>
