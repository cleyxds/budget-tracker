<script>
  import { Switch } from "@rgossiaux/svelte-headlessui"

  export let enabled = false
</script>

<Switch
  checked={enabled}
  on:change={(e) => (enabled = e.detail)}
  class={enabled ? "switch switch-enabled" : "switch switch-disabled"}
>
  <span class="sr-only">Enable notifications</span>
  <span class="toggle" class:toggle-on={enabled} class:toggle-off={!enabled} />
</Switch>

<style>
  :global(.switch) {
    position: relative;
    display: inline-flex;
    align-items: center;
    border-radius: 9999px;
    height: 1.5rem;
    width: 2.75rem;

    border: none;
  }

  :global(.switch-enabled) {
    /* Blue */
    background-color: rgb(37 99 235);

    transition: background-color 0.3s;
  }

  :global(.switch-disabled) {
    /* Gray */
    background-color: rgb(229 231 235);

    transition: background-color 0.3s;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .toggle {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-color: rgb(255 255 255);
    border-radius: 9999px;
  }

  .toggle-on {
    transform: translateX(1.1rem);

    transition: transform 0.3s;
  }

  .toggle-off {
    transform: translateX(-0.25rem);

    transition: transform 0.3s;
  }
</style>
