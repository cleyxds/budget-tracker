<script>
  // let features = [
  //   {
  //     title:"gerenciamento de custos"
  //     color: "#FF4397",
  //     group: "Gerenciamento"
  //   }
  // ]
</script>

<div class="featuresContainer">
  <h1>Nossos<br />recursos</h1>

  <section class="featuresListContainer">
    <div class="featureCard leftMargin" style:background-color={"#FF4397"}>
      <p>gerenciamento de custos</p>

      <h1>Gerenciamento</h1>
    </div>

    <div class="featureCard leftMargin" style:background-color={"#0990FF"}>
      <p>gerenciamento de custos</p>

      <h1>Gerenciamento</h1>
    </div>
  </section>
</div>

<style>
  .featuresContainer {
    margin-top: 7rem;
  }

  .featuresContainer h1 {
    font-family: "Azeret Mono", monospace;
    font-weight: 400;
    font-size: 2rem;
  }

  .featuresListContainer {
    max-width: 100%;

    overflow-x: scroll;
    display: flex;

    min-height: 31.25rem;

    margin-top: 2rem;
    padding: 3rem;

    background-color: #faec0f;

    border-radius: 16px;
  }

  .leftMargin {
    margin-left: 1rem;
  }

  .featureCard {
    display: flex;
    justify-content: center;
    flex-direction: column;

    max-width: 14rem;
    border-radius: 60px;
    padding: 1rem;
  }

  .featureCard h1 {
    margin-top: 1.5rem;
  }
</style>
