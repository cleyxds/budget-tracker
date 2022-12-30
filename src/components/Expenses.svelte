<script>

  import {authentication} from "../stores/authentication"
  import {user} from "../stores/user"

  import MonthlyExpenses from "./MonthlyExpenses.svelte"
  import Progress from "./Progress.svelte"
  import ExpensesItem from "./ExpensesItem.svelte"

  let monthlyBudget = 1500
  let spendThisMonth = 667.87
  let leftToSpend = monthlyBudget - spendThisMonth

  let progress = Math.round((((spendThisMonth * 100) /monthlyBudget) + Number.EPSILON) * 100) / 100

  const autoAndTransportExpenses = [
    {
      name: "Auto & transport",
      price: 350,
      maxPrice: 536
    },
    {
      name: "Auto insurance",
      price: 250,
      maxPrice: 370
    },
  ]

  const billAndUtilitiesExpenses = [
    {
      name: "Subscriptions",
      price: 52,
      maxPrice: 52
    },
    {
      name: "House service",
      price: 138,
      maxPrice: 148
    },
    {
      name: "Maintenance",
      price: 130,
      maxPrice: 160
    },
  ]

  const gamingPcExpenses = [
    {
      name: "Placa-mãe",
      price: 200,
      maxPrice: 421
    },
  ]

</script>

<style>
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

    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;

    background-color: var(--light-background);
    color: var(--black-II);
  }

  .greetingContainer p {
    align-self: center;
  }

  .greetingContainer p {
    margin-left: auto;
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

    font-family: 'DM Sans', sans-serif;
    font-weight: 400;

    font-size: 14px;
    line-height: 20px;
  }

  .monthlyCalculated div span {
    color: var(--black-II);

    font-family: 'DM Sans', sans-serif;
    font-weight: 700;

    font-size: 18px;
    line-height: 28px;
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

  .monthlyUserExpense section p {
    margin-right: 4px;
  }

  .monthlyUserExpense span {
    font-family: "DM Sans", sans-serif;
    font-weight: 700;
    font-size: 48px;
    line-height: 58px;
  }
</style>

{#if $authentication.isAuthenticated}
  <div class="greetingContainer">
    <span>Hello {$user?.name}</span>

    <p>Hello</p>
  </div>

  <div class="monthlyUserExpense">
    <MonthlyExpenses />
    
    <span>${spendThisMonth}</span>
  </div>

  <div class="monthlyCalculated">
    <section>
      <div>
        <p>Left to spent</p>
        <span>${leftToSpend}</span>
      </div>

      <div>
        <p>Monthly budget</p>
        <span>${monthlyBudget}</span>
      </div>

    </section>
    
    <Progress progress={progress} />
  </div>

  <ExpensesItem title="Auto & transport" total={700} color="var(--expense-tertiary)" expenses={autoAndTransportExpenses} />
  <ExpensesItem title="Bill & Utilities" total={320} color="var(--expense-primary)" expenses={billAndUtilitiesExpenses} />
  <ExpensesItem title="Gaming PC" total={421} color="var(--expense-secondary)" expenses={gamingPcExpenses} />
{/if}