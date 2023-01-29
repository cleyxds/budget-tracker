<script>
  import { authentication } from "../../stores/authentication"
  import { expenses } from "../../stores/expenses"
  import { user } from "../../stores/user"

  import ExpensesItem from "../ExpensesItem.svelte"
  import MonthExpendings from "./components/MonthExpendings.svelte"
  import MonthMoneySpent from "./components/MonthMoneySpent.svelte"

  let monthlyBudget = null
  let spendThisMonth = null
  let userData = null
  let expensesList = []

  $: leftToSpend = monthlyBudget - spendThisMonth
  $: progress =
    Math.round(
      ((spendThisMonth * 100) / monthlyBudget + Number.EPSILON) * 100
    ) / 100

  $: {
    spendThisMonth = expensesList
      ?.map((item) => item?.total)
      ?.reduce((previous, current) => previous + current, 0)
  }

  user.subscribe((user) => {
    monthlyBudget = user?.monthlyBudget

    userData = user
  })

  expenses.subscribe((data) => {
    expensesList = data
  })
</script>

{#if $authentication.isAuthenticated}
  <MonthMoneySpent {monthlyBudget} {spendThisMonth} {userData} />

  <MonthExpendings
    {leftToSpend}
    {monthlyBudget}
    {progress}
    {spendThisMonth}
    {userData}
  />

  {#each expensesList as expense, index}
    <ExpensesItem {...expense} {expensesList} {index} {userData} />
  {/each}
{/if}
