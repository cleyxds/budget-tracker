<script>

  import { goto } from '@roxi/routify'

  import { Dialog } from "@rgossiaux/svelte-headlessui"

  import Cookies from 'js-cookie'

  let isOpen = false

  import Screen from '../components/Screen.svelte'
  import NavBar from "../components/NavBar.svelte"

  import { authentication } from "../stores/authentication"
  import { user, DEFAULT_USER } from "../stores/user"

  import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
  import { auth,userDoc } from '../services/firebase'
  import { setDoc } from 'firebase/firestore'

  async function handleLogin(event) {
    const formData = new FormData(event?.target)

    const formdata = {}
    for (let field of formData) {
      const [key, value] = field
      formdata[key] = value
    }

    function proceedAppAuthentication({ redirect = true }) {
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
  
        if (redirect) $goto('/')
        return
      }
    }

    async function updateUserCookie({ userId = "" }) {
      Cookies.set('JSESSIONID', userId)
    }

    try {
      const user = await createUserWithEmailAndPassword(
          auth,
          formdata?.email,
          formdata?.password,
      )
      await updateProfile(user.user, { displayName: formdata?.email })

      await setDoc(userDoc(auth.currentUser.uid), {
          username: user.user.displayName,
          email: user.user.email
      })

      await updateUserCookie({ userId: auth.currentUser.uid })

      proceedAppAuthentication({ redirect: true })
    } catch (error) {
      console.warn('error from creating user', error)
    }
  }
</script>

<style>
  .authenticationContainer {
    display: flex;
    flex-direction: column;
    
    min-height: 32px;
    width: 40%;
    align-self: center;

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
    left: 2%;
  }

  .formInputs {
    display: flex;
    flex-direction: column;
  }

  .commonMargin {
    margin-top: 1.5rem;
  }

  @media only screen and (max-width: 600px) {
    .authenticationContainer {
      width: 80%;
    }
}
</style>

<Screen>
  <button on:click={() => (isOpen = true)}>Open</button>

  <Dialog open={isOpen} on:close={() => (isOpen = false)}>
    <form on:submit|preventDefault={handleLogin} class="authenticationContainer authenticationContainerPosition">
      
      <label for="email" class="formInputs commonMargin">
        Email
        <input type="email" name="email" required>
      </label>

      <label for="password" class="formInputs commonMargin">
        Password
        <input type="password" name="password" required>
      </label>

      <button type="submit" class="commonMargin">Submit</button>
    </form>
  </Dialog>
</Screen>

<NavBar />
