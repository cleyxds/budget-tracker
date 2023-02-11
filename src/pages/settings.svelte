<script>
  import Screen from "../components/Screen.svelte"
  import NavBar from "../components/NavBar.svelte"
  import Header from "../components/Header.svelte"
  import Loader from "../components/Loader.svelte"

  import { handleLogout } from "../lib/utils/authentication"
  import { goto } from "@roxi/routify"

  let goalsEnabled = true

  import { authentication } from "../stores/authentication"
  import { user, DEFAULT_USER } from "../stores/user"

  const logoutCallback = () => {
    user.set(DEFAULT_USER)

    $goto("/")
  }
</script>

<Screen>
  <Header
    leftComponent={{ type: "logo" }}
    middleComponent={{ title: " Configurações " }}
  />

  <ul>
    <li
      on:keydown={() => {}}
      on:click={() =>
        handleLogout({ authentication, callback: logoutCallback })}
    >
      Sair
    </li>

    <li>
      <p>Habilitar metas</p>
      <input type="checkbox" bind:checked={goalsEnabled} name="" id="" />
      <Loader size={18} />
    </li>

    <li>
      <p>Idioma</p>
      <select name="Idioma">
        <option value="pt-BR" selected>Português</option>
        <option value="en-US">Inglês</option>
      </select>
    </li>
  </ul>
</Screen>

<NavBar />

<style>
  ul {
    display: flex;
    flex-direction: column;

    padding: 0 2rem;
  }

  ul li {
    display: flex;
    align-self: flex-start;

    margin-top: 0.5rem;

    cursor: pointer;
  }

  ul li:nth-child(1) {
    margin-top: 0;
  }

  ul li:nth-child(2) {
    align-items: center;
  }
</style>
