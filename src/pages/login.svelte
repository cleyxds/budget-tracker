<script>
  import Screen from "../components/Screen.svelte"
  import Header from "../components/Header.svelte"
  import NavBar from "../components/NavBar.svelte"

  import { goto } from "@roxi/routify"

  import { handleLogin, LOGIN_THIRD_PARTY } from "../lib/utils/authentication"

  import { authentication } from "../stores/authentication"
  import { user } from "../stores/user"

  let errors

  const callback = (formdata) => {
    user.update((state) => ({
      ...state,
      id: formdata?.id,
      name: formdata?.email,
    }))

    $goto("/")
  }

  async function handleUserLogin(event) {
    if (event === LOGIN_THIRD_PARTY.GOOGLE) {
      try {
        await handleLogin({ event: "google" })
      } catch (error) {
        alert(error)
      }

      return
    }

    try {
      await handleLogin({
        event,
        authentication,
        callback,
      })
    } catch (error) {
      const errorMessage = error?.message
      const isEmailOrPasswordError = errorMessage?.includes(
        "(auth/wrong-password)"
      )

      if (isEmailOrPasswordError) {
        alert("Email ou senha incorretos")
      }
    }
  }
</script>

<Screen>
  <Header />

  <div>
    <button on:click={() => handleUserLogin(LOGIN_THIRD_PARTY.GOOGLE)}
      >Continue com Google</button
    >

    <p>ou</p>

    <form on:submit|preventDefault={handleUserLogin}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />

      <button type="submit">Log in</button>
    </form>
  </div>
</Screen>

<NavBar />

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;

    padding-top: 15vh;
  }

  div p {
    height: 60px;

    font-size: 16px;
    line-height: 60px;
    color: var(--gray-I);
  }

  button {
    min-width: 30%;
    height: 48px;
    line-height: 48px;

    padding: 0 20px;

    border: 3px solid var(--dark-background);
    border-radius: 8px;

    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  button[type="submit"] {
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 30%;

    margin-top: 1rem;
    color: var(--white-I);
    background-color: var(--dark-background);
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
  }

  form input {
    margin-top: 1rem;

    min-width: 30%;
    height: 48px;

    padding: 0 20px;

    border: 3px solid var(--dark-background);
    border-radius: 8px;

    font-family: "DM Sans", sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 40px;
  }

  @media only screen and (max-width: 600px) {
    button {
      min-width: 60%;
    }

    form input {
      min-width: 60%;
    }
  }
</style>
