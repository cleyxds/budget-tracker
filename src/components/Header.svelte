<script>

  import { goto } from "@roxi/routify"

  import { handleLogout } from "../lib/utils/authentication"

  import { authentication } from "../stores/authentication"
  import { user, DEFAULT_USER } from "../stores/user"

  const logoutCallback = () => {
    user.set(DEFAULT_USER)

    $goto('/')
  }

</script>

<style>
  header {
    padding: 24px 32px 0 32px;

    display: flex;
    justify-content: space-around;
  }
</style>

<header>
  <h1>Budgets</h1>
  
  {#if !$authentication.isAuthenticated}
    <h1 on:keydown={() => {}} on:click={() => $goto("/login")}>Login</h1>
  {/if}

  {#if $authentication.isAuthenticated}
    <h1 on:keydown={() => {}} on:click={() => handleLogout({ authentication, callback: logoutCallback })}>Log out</h1>
  {/if}
</header>
