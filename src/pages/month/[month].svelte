<script>
  import Header from "../../components/Header.svelte"
  import NavBar from "../../components/NavBar.svelte"
  import Screen from "../../components/Screen.svelte"

  import { month } from "../../stores/month"
</script>

<Screen>
  <Header middleComponent={{ title: $month }} />
</Screen>

<NavBar />
