<script>

  import { goto } from '@roxi/routify'

  import { Dialog } from "@rgossiaux/svelte-headlessui"

  let isOpen = false

  import Screen from '../components/Screen.svelte'
  import NavBar from "../components/NavBar.svelte"

  import { authentication } from "../stores/authentication"
  import { user, DEFAULT_USER } from "../stores/user"

  function handleLogin(event) {
    const formData = new FormData(event?.target)

    formData?.append("id", new String(Math.round(Math.random() * 100)))

    const formdata = {}
    for (let field of formData) {
      const [key, value] = field
      formdata[key] = value
    }

    authentication.update(state => ({
      ...state,
      isAuthenticated: !state?.isAuthenticated
    }))

    isOpen = false

    if (!$authentication.isAuthenticated) {
      user.set(DEFAULT_USER)
      return
    }

    if ($authentication.isAuthenticated) {
      user.update(state => ({
        ...state,
        id: formdata?.id,
        name: formdata?.email
      }))

      $goto('/')
      return
    }
  }
</script>

<style>
  .authenticationContainer {
    display: flex;
    flex-direction: column;
    
    min-height: 32px;
    width: 400px;

    padding: 0 1.5rem 1.5rem 1.5rem;

    border: 1px solid var(--white-II);
    border-radius: 20px;

    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;

    background-color: var(--light-background);
    color: var(--black-II);
  }

  .authenticationContainerPosition {
    position: absolute;
    top: 4%;
  }

  .formInputs {
    display: flex;
    flex-direction: column;
  }

  .commonMargin {
    margin-top: 1.5rem;
  }
</style>

<Screen>
  <button on:click={() => (isOpen = true)}>Open</button>

  <Dialog open={isOpen} on:close={() => (isOpen = false)}>
    <form on:submit|preventDefault={handleLogin} class="authenticationContainer authenticationContainerPosition">
      
      <label for="email" class="formInputs commonMargin">
        Email
        <input type="email" name="email">
      </label>

      <label for="password" class="formInputs commonMargin">
        Password
        <input type="password" name="password">
      </label>

      <button type="submit" class="commonMargin">Submit</button>
    </form>
  </Dialog>
</Screen>

<NavBar />
