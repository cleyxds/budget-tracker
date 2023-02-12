<script>
  import SelectMonth from "./SelectMonth.svelte"

  import { truncate } from "../../../lib/utils/truncate"
  import { getCurrency } from "../../../lib/utils/user"

  export let spendThisMonth
  export let monthlyBudget
  export let userData
</script>

<div class="monthlyUserExpense">
  <SelectMonth />

  {#if spendThisMonth || monthlyBudget}
    <span>{getCurrency(userData?.currency)}{truncate(spendThisMonth)}</span>
  {/if}
</div>

<style>
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

    z-index: 9998;
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
