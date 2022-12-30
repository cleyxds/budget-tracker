<script>

  import PlusIcon from "../assets/icons/PlusIcon.svelte"

  export let user
  export let actions = {}

  const firstName = $user?.name.split?.("@")?.[0]

</script>

<style>
  .iconContainer {
    display: inherit;
    align-items: center;
    padding: 10px;

    cursor: pointer;
  }

  section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 48px;

    margin: 1rem 2rem 0px 2rem;
    padding: 0 20px;
    
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    border-radius: 9999px;

    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;

    background-color: var(--light-background);
    color: var(--black-II);
  }

  .leftContainer {
    display: flex;
    flex: 1;
    justify-content: flex-start;

    color: var(--gray-I);
  }

  .middleContainer {
    display: flex;
    justify-content: center;
    flex: 1;
    padding: 0 8px;
  }

  .rightContainer {
    display: flex;
    justify-content: flex-end;
    flex: 1;
  }
</style>

<section>
  <div class="leftContainer">
    <span>{firstName}</span>
  </div>

  <div class="middleContainer">
    Expenses
  </div>

  <div class="rightContainer">
    <div on:keydown={() => {}} on:click={actions?.handleAddExpense} class="iconContainer">
      <PlusIcon />
    </div>
  </div>


</section>