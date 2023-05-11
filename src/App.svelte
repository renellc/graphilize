<script lang="ts">
  import { onDestroy } from "svelte";
  import { GraphTypes, type Graph } from "./lib/graph";
  import { graphStore } from "./lib/stores";

  let graph: Graph;

  const unsubscribeGraphStore = graphStore.subscribe((graphInitial) => {
    graph = graphInitial;
  });

  let fromVertexIn: number = 0;
  let toVertexIn: number = 0;

  $: console.log(graph);
  $: fromVertex = Math.max(
    0,
    Math.min(fromVertexIn, graph.vertices.length - 1)
  );
  $: toVertex = Math.max(0, Math.min(toVertexIn, graph.vertices.length - 1));

  onDestroy(unsubscribeGraphStore);
</script>

<main>
  <h1>Graphilize</h1>
  <p>Graph vizualizations, built with Svelte</p>

  <section>
    <div>
      Graph Type: {graph.type}
      <select
        on:change={(event) =>
          graphStore.setGraphType(event.currentTarget.value)}
      >
        {#each GraphTypes as graphType}
          <option value={graphType}>
            {graphType}
          </option>
        {/each}
      </select>
    </div>

    <div>
      <button on:click={graphStore.addVertex}>Add vertex</button>
      <ul>
        {#each graph.vertices as _, idx}
          <li>
            {idx}, connected to {JSON.stringify(
              graph.adjacencyMatrix[idx]
                .map((edge, idx) => ({ hasEdge: edge === 1, idx }))
                .filter((curr) => curr.hasEdge)
                .map((curr) => curr.idx)
            )}
            <button on:click={() => graphStore.removeVertex(idx)}>
              Delete vertex
            </button>
          </li>
        {/each}
      </ul>
    </div>

    <div style="display: flex; flex-direction: column">
      Add edge
      <label for="fromVertex">
        From
        <input
          type="number"
          name="fromVertex"
          min={0}
          max={graph.vertices.length - 1}
          bind:value={fromVertexIn}
        />
      </label>
      <label for="toVertex">
        To
        <input
          type="number"
          name="toVertex"
          min={0}
          max={graph.vertices.length - 1}
          bind:value={toVertexIn}
        />
      </label>
      <button
        on:click={() => {
          fromVertexIn = fromVertex;
          toVertexIn = toVertex;
          graphStore.addEdge({
            fromVertexIdx: fromVertex,
            toVertexIdx: toVertex,
          });
        }}
      >
        Add edge
      </button>
    </div>
  </section>
</main>
