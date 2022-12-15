<script>

  import Screen from "../components/Screen.svelte"
  import NavBar from "../components/NavBar.svelte"

  import { authentication } from '../stores/authentication';
  import { user } from '../stores/user';
  
  let className

  authentication.subscribe(({isAuthenticated}) => {
		if (!isAuthenticated) {
      className = `landingContainer unautheneticatedContainer`
      return
    }

    className = "landingContainer"
	})

</script>

<style>
  .landingContainer {
    display: flex;
    flex-direction: column;
  }

  .unautheneticatedContainer {
    padding: 0 36px;
  }

  .landingContainer h1 {
    font-size: 4rem;
    line-height: 5rem;
    text-transform: uppercase;
  }

  .greetingContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    
    min-height: 32px;

    margin: 12px 1rem 4px 1rem;
    padding: 4px 24px;

    border: 1px solid var(--white-II);
    border-radius: 9999px;

    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    background-color: var(--light-background);
    color: var(--black-II);
  }

  .monthlyUserExpense {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: sticky;
    top: 0px;

    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    margin-bottom: 28px;
    
    color: var(--black-I);
  }

  .monthlyUserExpense p {
    font-size: 14px;
    line-height: 20px;

    margin-bottom: 4px;
    margin-top: 16px;
  }

  .monthlyUserExpense span {
    font-size: 48px;
    line-height: 58px;
  }

  .monthlyCalculated {
    padding: 14px 20px 20px;

    box-shadow: 0px 25px 40px -10px rgba(0, 0, 0, 0.06);

    background-color: var(--light-background);

    border: 1px solid var(--white-II);
    border-radius: 18px;

    margin: 0px 16px 20px;
  }

  .monthlyCalculated section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    margin-bottom: 1rem;
  }

  .monthlyCalculated div p {
    color: var(--gray-I);
    font-size: 14px;
    line-height: 20px;
  }

  .monthlyCalculated div span {
    color: var(--black-II);
    font-size: 18px;
    line-height: 28px;
  }

  .monthlyCalculated div[type=progress] {
    height: 8px;
    border-radius: 9999px;

    background-color: var(--dark-background);
  }

  .expenseItem {
    padding: 20px 20px 24px;

    box-shadow: 0px 25px 40px -10px rgba(0, 0, 0, 0.06);

    background-color: var(--light-background);

    border: 1px solid var(--white-II);
    border-radius: 18px;

    margin: 0px 16px 20px;
  }

  .expenseItem div {
    min-height: 45px;
    background-color: lightblue;

    margin-bottom: 20px;
  }

  .expenseItem section {
    min-height: 45px;
    background-color: pink;

    margin-bottom: 27px;
  }
</style>

<Screen>
  <div class={className}>
    {#if !$authentication.isAuthenticated}
      <h1>
        Never struggle on your finances again
      </h1>
    {/if}
  
    {#if $authentication.isAuthenticated}
      <div class="greetingContainer">
        <span>Hello {$user?.name}</span>
      </div>

      <div class="monthlyUserExpense">
        <p>December 2022</p>
        
        <span>$0,00</span>
      </div>

      <div class="monthlyCalculated">
        <section>
          <div>
            <p>Left to spent</p>
            <span>$1,500</span>
          </div>
  
          <div>
            <p>Monthly budget</p>
            <span>$1,500</span>
          </div>

        </section>
        
        <div type="progress" />
      </div>

      <div class="expenseItem">
        <div>

        </div>

        <section>

        </section>
      </div>

      <div class="expenseItem">
        <div>

        </div>

        <section />
        <section />
        <section />
        <section />
      </div>
    {/if}
  </div>
</Screen>

<NavBar />
