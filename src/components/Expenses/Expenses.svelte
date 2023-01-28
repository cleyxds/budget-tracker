<script>

  import { authentication } from "../../stores/authentication"
  import { expenses } from "../../stores/expenses"
  import { user } from "../../stores/user"

  import MonthlyExpenses from "../MonthlyExpenses.svelte"
  import Progress from "../Progress.svelte"
  import ExpensesItem from "../ExpensesItem.svelte"
  import Loader from "../Loader.svelte"

  import { handleAddExpenses } from "../../lib/utils/expenses"
  import { getCurrency, handleUpdateUserMonthlyBudget } from "../../lib/utils/user"
  import { truncate } from "../../lib/utils/truncate"

  let monthlyBudget = null
  let spendThisMonth = null
  let userData = null
  let expensesList = []

  $: leftToSpend = monthlyBudget - spendThisMonth
  $: didExtrapolate = leftToSpend >= monthlyBudget

  $: extrapolateBudgetTextColorI = didExtrapolate ? "var(--red-I)" : "var(--gray-I)"
  $: extrapolateBudgetTextColorII = didExtrapolate ? "var(--red-I)" : "var(--black-II)"

  $: progress = Math.round((((spendThisMonth * 100) / monthlyBudget) + Number.EPSILON) * 100) / 100

  $: {
    spendThisMonth = expensesList?.map(item => item?.total)?.reduce((previous, current) => previous + current, 0)
  }

  user.subscribe(user => {
    monthlyBudget = user?.monthlyBudget

    userData = user
  })

  expenses.subscribe(data => {
    expensesList = data
  })

  const greetingBarActions = {
    handleAddExpenses
  }

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

    z-index: 9999;
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
  <div class="monthlyUserExpense">
    <MonthlyExpenses />
    
    {#if spendThisMonth || monthlyBudget}
      <span>{getCurrency(userData?.currency)}{truncate(spendThisMonth)}</span>
    {/if}
  </div>

  {#if spendThisMonth || monthlyBudget}
    <div class="monthlyCalculated">
      <section>
        <div>
          <p style:color={extrapolateBudgetTextColorI}>Left to spent</p>
          <span style:color={extrapolateBudgetTextColorII}>{getCurrency(userData?.currency)}{truncate(leftToSpend)}</span>
        </div>

        <div>
          <p>Monthly budget</p>

          {#if monthlyBudget || monthlyBudget === 0}
            <span>{getCurrency(userData?.currency)}</span>
            <span contenteditable="true" on:input={(event) => handleUpdateUserMonthlyBudget({ userId: userData?.id, monthlyBudget: event.currentTarget.innerText })}>{truncate(monthlyBudget)}</span>
          {:else}
            <Loader size={28} />
          {/if}
        </div>

      </section>
      
      <Progress progress={progress} />
    </div>
  {/if}

  {#each expensesList as expense, index}
    <ExpensesItem {...expense} expensesList={expensesList} index={index} user={userData} />
  {/each}
{/if}