<script lang="ts">
  export let title: string = "";
</script>

<details class="collapsible__container">
  <summary>
    {#if title.length > 0}
      {title}
    {/if}
    <span>^</span>
  </summary>

  <slot />
</details>

<style>
  :root {
    --toggle-transition-time: 0.2s;
  }

  .collapsible__container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .collapsible__container summary {
    display: flex;
    flex-direction: row;
  }

  .collapsible__container summary:hover {
    cursor: pointer;
  }

  .collapsible__container summary span {
    margin-left: auto;
    transform: rotate(180deg);
    transition: all var(--toggle-transition-time);
  }

  .collapsible__container[open] summary span {
    margin-left: auto;
    transform: rotate(0);
    transition: all var(--toggle-transition-time);
  }
</style>
