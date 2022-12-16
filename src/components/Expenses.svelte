<script>

  import Progress from "./Progress.svelte"

  export let title
  export let total
  export let color
  export let expenses

</script>

<style>
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
    flex: 1;
    justify-content: space-between;
  }

  .expenseItem div article p {
    font-size: 17.12px;
    line-height: 29.96px;

    color: var(--black-II);
  }

  .expenseItem div article span {
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
  }
</style>

<div class="expenseItem">
  <div>
    <svg style:background-color={color}>
      
    </svg>
    
    <article>
      <p>{title}</p>
      <span>${total}</span>
    </article>
  </div>

  {#each expenses as expense, index}
    <section class="expense">
      <div>
        <p>{expense?.name}</p>
        <p>${expense?.price}</p>
      </div>
      
      <div>
        <div style:margin-right="27.82px" style:flex={1}>
          <Progress color={color} progress={Math.round((((expense?.price * 100) / expense?.maxPrice) + Number.EPSILON) * 100) / 100} />
        </div>
        
        <h3>Left ${expense?.maxPrice - expense?.price}</h3>
      </div>
    </section>
  {/each}
</div>
