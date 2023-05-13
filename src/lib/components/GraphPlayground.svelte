<script lang="ts">
  import Konva from "konva";
  import { Layer, Rect, Stage } from "svelte-konva";

  const stageDims = { width: 3000, height: 3000 };

  let stage: Konva.Stage;

  function repositionStage(
    event: UIEvent & { currentTarget: EventTarget & HTMLElement }
  ) {
    const { currentTarget } = event;
    const dx = currentTarget.scrollLeft;
    const dy = currentTarget.scrollTop;
    stage.container().style.transform = "translate(" + dx + "px, " + dy + "px)";
    stage.x(-dx);
    stage.y(-dy);
  }
</script>

<section id="graph-container" on:scroll={(event) => repositionStage(event)}>
  <div
    id="graph-inner-container"
    style="width: {stageDims.width}px; height: {stageDims.height}px;"
  >
    <Stage
      config={{ width: stageDims.width, height: stageDims.height }}
      bind:handle={stage}
    >
      <Layer>
        <Rect
          config={{
            fill: "red",
            width: 100,
            height: 100,
            draggable: true,
            x: 100,
            y: 100,
          }}
          on:pointerenter={(event) => {
            stage.container().style.cursor = "grab";
          }}
          on:pointerleave={(event) => {
            stage.container().style.cursor = "default";
          }}
          on:dragmove={(event) => {
            stage.container().style.cursor = "grabbing";
          }}
          on:dragend={(event) => {
            stage.container().style.cursor = "grab";
          }}
        />
      </Layer>
    </Stage>
  </div>
</section>

<style>
  #graph-container {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  #graph-inner-container {
    overflow: hidden;
  }
</style>
