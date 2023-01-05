<script>

  import { authentication } from "../stores/authentication"
  import { user } from "../stores/user"

  import MonthlyExpenses from "./MonthlyExpenses.svelte"
  import Progress from "./Progress.svelte"
  import ExpensesItem from "./ExpensesItem.svelte"
  import Greeting from "./Greeting.svelte"

  import { handleAddExpense, handleGetUserExpenses } from "../lib/utils/expenses"
  import { onMount } from "svelte"

  let monthlyBudget = 1500
  let spendThisMonth = 667.87
  let leftToSpend = monthlyBudget - spendThisMonth

  let progress = Math.round((((spendThisMonth * 100) /monthlyBudget) + Number.EPSILON) * 100) / 100

  let expenses = []

  const greetingBarActions = {
    handleAddExpense
  }

  onMount(async () => {
    const userExpenses = await handleGetUserExpenses({ userId: $user?.id})
    
    expenses = userExpenses
  })

</script>

<style>
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
  <Greeting user={user} actions={greetingBarActions} />

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

  {#each expenses as expense}
    <ExpensesItem title={expense?.title} total={expense?.total} color={expense?.color} expenses={expense?.expenses} />
  {/each}
{/if}