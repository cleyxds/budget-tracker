<script>
  import { TrashCan } from "carbon-icons-svelte"
  import {
    EDIT_EXPENSE_TYPES,
    handleDeleteExpense,
    handleEditExpense,
  } from "../../../lib/utils/expenses"
  import { formatProgressValue } from "../../../lib/utils/progress"
  import { truncate } from "../../../lib/utils/truncate"

  import { getCurrency } from "../../../lib/utils/user"

  import Progress from "../../Progress.svelte"

  export let expense
  export let userData
  export let expensesList
  export let index
  export let color

  $: userId = userData?.id
</script>

<section class="container">
  <div class="topContainer adjust">
    <div class="component">
      <p>{expense?.name}</p>

      <div
        class="iconContainer"
        on:keydown={() => {}}
        on:click={() =>
          handleDeleteExpense({
            expenseId: expense?.id,
            expensesId: expensesList?.[index]?.id,
            userId,
          })}
      >
        <TrashCan size={20} />
      </div>
    </div>

    <div class="component spendings items-end">
      <div class="component">
        <p>Gasto {getCurrency(userData?.currency)}</p>

        <p
          contenteditable="true"
          on:input={(event) =>
            handleEditExpense({
              type: EDIT_EXPENSE_TYPES.PRICE,
              value: event.currentTarget.innerText,
              expenseId: expense?.id,
              userId,
            })}
        >
          {truncate(expense?.price)}
        </p>
      </div>

      <div class="component iconContainer commonMarginI">
        <p>Custo {getCurrency(userData?.currency)}</p>
        <p
          contenteditable="true"
          on:input={(event) =>
            handleEditExpense({
              type: EDIT_EXPENSE_TYPES.MAX_PRICE,
              value: event.currentTarget.innerText,
              expenseId: expense?.id,
              userId,
            })}
        >
          {truncate(expense?.maxPrice)}
        </p>
      </div>
    </div>
  </div>

  <div class="bottomContainer commonMarginII">
    <div style:margin-right="27.82px" style:flex={1}>
      <Progress {color} progress={formatProgressValue(expense)} />
    </div>

    <strong>
      Left {getCurrency(userData?.currency)}{truncate(
        expense?.maxPrice - expense?.price
      )}
    </strong>
  </div>
</section>

<style>
  .container {
    /* margin-top: 1rem; */
    border-bottom: 1px solid var(--white-II);
    padding-bottom: 1rem;
  }

  .container:last-child {
    border-bottom: 0px solid var(--white-II);
    padding-bottom: 0;
  }

  .topContainer {
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  .iconContainer {
    margin-left: 0.5rem;

    cursor: pointer;
  }

  .adjust {
    justify-content: space-between;
  }

  .component {
    display: flex;
    align-items: center;
  }

  .items-end {
    align-items: flex-end;
  }

  .spendings {
    flex-direction: column;
  }

  .commonMarginI {
    margin-top: 0.25rem;
  }

  .commonMarginII {
    margin-top: 1rem;
  }

  .bottomContainer {
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
</style>
