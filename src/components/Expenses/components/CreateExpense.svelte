<script>
  import { handleAddExpenses } from "../../../lib/utils/expenses"

  import { user } from "../../../stores/user"

  export let close

  function onEndCreateExpenses() {
    close?.()
  }
</script>

<div class="createExpense">
  <form
    on:submit|preventDefault={(event) =>
      handleAddExpenses({
        event,
        userId: $user.id,
        onEnd: onEndCreateExpenses,
      })}
  >
    <label class="commonMargin" for="expenseTitle">
      Nome da despesa

      <input type="text" required name="expenseTitle" />
    </label>

    <button class="commonMargin" type="submit">Criar</button>
  </form>
</div>

<style>
  .createExpense {
    display: flex;

    min-width: 10rem;
    max-width: 20rem;
    min-height: 5rem;

    padding: 1rem;

    border: 1px solid var(--white-II);
    border-radius: 0.5rem;

    background-color: var(--light-background);
  }

  .createExpense label {
    font-size: 1rem;
  }

  .createExpense input {
    padding: 0.5rem;

    color: var(--black-I);

    border-radius: 0.5rem;
  }

  .createExpense button {
    width: 100%;

    border: 0;

    background-color: var(--black-I);
    color: var(--white-II);

    padding: 0.8rem;

    font-family: "DM Sans", sans-serif;
    font-weight: 600;
  }

  .commonMargin {
    margin-top: 1rem;
  }
</style>
