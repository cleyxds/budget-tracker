<script>

  import { Dialog } from "@rgossiaux/svelte-headlessui"

  import Progress from "./Progress.svelte"
  import PlusIcon from "../assets/icons/PlusIcon.svelte"

  import { handleAddExpense } from "../lib/utils/expenses"
  let isModalExpenseOpen = false;

  export let title
  export let total
  export let color
  export let expenses
  export let id

  function formatProgressValue(expense) {
    return Math.round((((expense?.price * 100) / expense?.maxPrice) + Number.EPSILON) * 100) / 100
  }

  function truncatePrice(value = 0) {
    return Math.round((value + Number.EPSILON) * 100) / 100
  }

  function onFinishSubmitExpense() {
    isModalExpenseOpen = false
  }

</script>

<style>
  .iconContainer {
    display: inherit;
    align-items: center;
    padding: 10px;

    cursor: pointer;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .expenseItem div svg {
    width: 48.14px;
    height: 48.14px;

    border-radius: 14.98px;

    margin-right: 17.12px;

    opacity: 30%;

    justify-content: center;
    align-items: center;
  }

  .expenseItem div article {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-between;
  }

  .expenseItem div article div {
    display: flex;
  }

  .expenseItem div article p {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;

    margin-right: .5rem;

    font-size: 17.12px;
    line-height: 29.96px;

    color: var(--black-II);
  }
  
  .expenseItem div article span {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;

    font-size: 17.12px;
    line-height: 29.96px;

    color: var(--gray-II);
  }

  .expense {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 50.14px;

    margin-top: 28.89px;

    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
  }

  .expense div h3 {
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;

    color: var(--gray-II);
  }

  .dialog {
    display: flex;
    flex-direction: column;
    min-height: 50px;
    min-width: 50vw;
    border-radius: 8px;
    background-color: var(--light-background);
    box-shadow: 0px 25px 40px -10px rgb(0 0 0 / 6%);
    padding: 1rem;
  }

  .dialog p {
    font-size: 1.2rem;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;

    align-self: flex-start;

    color: var(--black-II);
  }

  .dialog form {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .dialog strong {
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
  
    color: var(--black-I);
  }

  .dialog input:nth-child(1) {
    margin-top: 2rem;
  }

  .dialog input {
    width: 100%;

    margin-top: 1rem;
    padding: .5rem;
    
    border-radius: 8px;
    border: 1px solid var(--black-I);
    
    align-self: center;
  }
  
  .dialog button {
    width: 104%;
    
    margin-top: 1rem;
    padding: .5rem;

    align-self: center;
  }
</style>

<div class="expenseItem">
  <div>
    <svg style:background-color={color} />
    
    <article>
      <div style="position: relative;">
        <p>{title}</p>

        <div on:keydown={() => {}} on:click={() => (isModalExpenseOpen = true)} class="iconContainer">
          <PlusIcon />
        </div>

        <Dialog style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" open={isModalExpenseOpen} on:close={() => (isModalExpenseOpen = false)}>
          <div class="dialog">
            <p>
              You are creating an expense on <strong>{title}</strong>
            </p>

            <form on:submit|preventDefault={(event) => handleAddExpense({ event, expensesId: id, onEnd: onFinishSubmitExpense })}>
              <input placeholder="Add title" type="text" required name="title" />
              <input placeholder="Price" type="number" required name="price" />
            
              <button type="submit">Submit</button>
            </form>
          </div>
        </Dialog>        
      </div>
      
      <span>${total}</span>
    </article>
  </div>

  {#each expenses as expense, index}
    <section class="expense">
      <div>
        <p>{expense?.name}</p>
        <p>${truncatePrice(expense?.price)}</p>
      </div>
      
      <div>
        <div style:margin-right="27.82px" style:flex={1}>
          <Progress color={color} progress={formatProgressValue(expense)} />
        </div>
        
        <h3>Left ${truncatePrice(expense?.maxPrice - expense?.price)}</h3>
      </div>
    </section>
  {/each}
</div>
