<script>

  import { onMount } from "svelte"

  import { Router } from "@roxi/routify"
  import { routes } from "../.routify/routes"
  
  import { authentication } from "./stores/authentication"
  import { user } from "./stores/user"

  import Cookies from 'js-cookie'

  import { userDoc } from './services/firebase'
  import { getDoc } from 'firebase/firestore'
  import Loading from "./components/Loading.svelte"

  let loading = false

  async function getUserCookie() {
    const JSESSIONID = Cookies.get('JSESSIONID')

    try {
      loading = true
      const userData = await getDoc(userDoc(JSESSIONID))

      const getUserData = userData?.data()

      authentication.update(state => ({
        ...state,
        isAuthenticated: !state?.isAuthenticated
      }))
      
      if ($authentication.isAuthenticated) {
        user.update(state => ({
          ...state,
          id: JSESSIONID,
          name: getUserData?.email
        }))
        return
      }
    } catch (error) {

    } finally {
      loading = false
    }

  }

  onMount(async () => {
    await getUserCookie()
  })

</script>

<Router routes={routes} />

<Loading message="Loading user" loading={loading} />
