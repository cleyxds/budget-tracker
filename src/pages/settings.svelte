<script>

  import Screen from "../components/Screen.svelte"
  import NavBar from "../components/NavBar.svelte"
  import Header from "../components/Header.svelte"

  let goalsEnabled = true

</script>

<style>
  ul {
    padding: 0 2rem;
  }

  ul li {
    display: flex;

    margin-top: .5rem;
  }

  ul li:nth-child(1) {
    margin-top: 0;
  }
</style>

<Screen>
  <Header middleComponent={{title: " Configurações "}} />

  <ul>
    <li>Sair</li>

    <li>
      <p>Habilitar metas</p>
      <input type="checkbox" bind:checked={goalsEnabled} name="" id="">
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
