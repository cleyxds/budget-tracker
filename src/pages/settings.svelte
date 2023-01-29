<script>
  import Screen from "../components/Screen.svelte"
  import NavBar from "../components/NavBar.svelte"
  import Header from "../components/Header.svelte"
  import Loader from "../components/Loader.svelte"

  let goalsEnabled = true
</script>

<Screen>
  <Header
    leftComponent={{ type: "logo" }}
    middleComponent={{ title: " Configurações " }}
  />

  <ul>
    <li>Sair</li>

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
    padding: 0 2rem;
  }

  ul li {
    display: flex;

    margin-top: 0.5rem;
  }

  ul li:nth-child(1) {
    margin-top: 0;
  }

  ul li:nth-child(2) {
    align-items: center;
  }
</style>
