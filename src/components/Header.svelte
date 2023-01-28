<script>

  import PlusIcon from "../assets/icons/PlusIcon.svelte"

  export let actions = {}

  export let middleComponent = { title: "Expenses" }


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
  </div>

  <div class="middleContainer">
    {!!middleComponent?.title && middleComponent.title}
  </div>

  <div class="rightContainer">
    <div on:keydown={() => {}} on:click={actions?.handleAddExpenses} class="iconContainer">
      <PlusIcon />
    </div>
  </div>


</section>