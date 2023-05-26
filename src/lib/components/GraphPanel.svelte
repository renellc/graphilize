<script lang="ts">
  import Icon from "@iconify/svelte";
  import graphIcon from "@iconify/icons-mdi/graph";
  import functionIcon from "@iconify/icons-mdi/function";
  import { graphStore } from "@/stores";
  import Collapsible from "./Collapsible.svelte";

  let selectedNavigation: "details" | "algorithms" = "details";
</script>

<div class="graph-panel__container">
  <div class="graph-panel__navigation">
    <div class="navigation-btn">
      <input type="radio" name="graphPanelNavigation" id="graphDetails" />
      <label for="graphDetails">
        <Icon icon={graphIcon} width={24} style="pointer-events: none" />
      </label>
    </div>

    <div class="navigation-btn">
      <input type="radio" name="graphPanelNavigation" id="algorithms" />
      <label for="algorithms">
        <Icon icon={functionIcon} width={24} style="pointer-events: none" />
      </label>
    </div>
  </div>

  <hr style="width: 100%;" />

  <div class="graph-panel__content">
    {#if selectedNavigation === "details"}
      {#each $graphStore.adjMatrix as vertex, idx}
        <Collapsible title="Vertex {idx}">
          <ul>
            {#each $graphStore.adjMatrix[idx] as edge, edgeIdx}
              {#if edge === 1}
                <li>Edge to vertex {edgeIdx}</li>
              {/if}
            {/each}
          </ul>
        </Collapsible>
      {/each}
    {/if}
  </div>
</div>

<style>
  :root {
    --container-padding: 8px;
  }

  .graph-panel__container {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 15%;
    height: 50%;

    display: flex;
    flex-direction: column;

    padding: var(--container-padding);
    border-radius: 0.5rem;
    box-shadow: 0px 0px 12px -5px rgba(0, 0, 0, 0.75);
  }

  .graph-panel__container .graph-panel__navigation {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .graph-panel__navigation .navigation-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;
    z-index: 1;

    width: 100%;
    height: 100%;
  }

  .graph-panel__navigation .navigation-btn > input[type="radio"] {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;

    appearance: none;
    margin: 0;

    border-radius: 0.5rem;
  }

  .graph-panel__navigation .navigation-btn > input[type="radio"]:hover {
    cursor: pointer;
    background-color: #e7e7e7;
  }

  .graph-panel__navigation .navigation-btn > input[type="radio"]:checked {
    background-color: #e7e7e7;
  }

  .graph-panel__container .graph-panel__content {
    width: 100%;
    height: 100%;

    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
