<script>
  import Loader from "../../Loader.svelte"
  import Progress from "../../Progress.svelte"

  import {
    getCurrency,
    handleUpdateUserMonthlyBudget,
  } from "../../../lib/utils/user"
  import { truncate } from "../../../lib/utils/truncate"

  export let spendThisMonth
  export let monthlyBudget
  export let userData
  export let leftToSpend
  export let progress
</script>

{#if spendThisMonth || monthlyBudget}
  <div class="monthlyCalculated">
    <section>
      <div>
        <p>Left to spent</p>
        <span>{getCurrency(userData?.currency)}{truncate(leftToSpend)}</span>
      </div>

      <div>
        <p>Monthly budget</p>

        {#if monthlyBudget || monthlyBudget === 0}
          <span>{getCurrency(userData?.currency)}</span>
          <span
            contenteditable="true"
            on:input={(event) =>
              handleUpdateUserMonthlyBudget({
                userId: userData?.id,
                monthlyBudget: event.currentTarget.innerText,
              })}>{truncate(monthlyBudget)}</span
          >
        {:else}
          <Loader size={28} />
        {/if}
      </div>
    </section>

    <Progress {progress} />
  </div>
{/if}

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

    font-family: "DM Sans", sans-serif;
    font-weight: 400;

    font-size: 14px;
    line-height: 20px;
  }

  .monthlyCalculated div span {
    color: var(--black-II);

    font-family: "DM Sans", sans-serif;
    font-weight: 700;

    font-size: 18px;
    line-height: 28px;
  }
</style>
