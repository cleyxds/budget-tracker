<script>

  import Header from "../../components/Header.svelte"
  import NavBar from "../../components/NavBar.svelte"
  import Screen from "../../components/Screen.svelte"

  import { params } from '@roxi/routify'

</script>

<Screen>
  <Header middleComponent={{ title: $params?.month }}  />
</Screen>

<NavBar />
