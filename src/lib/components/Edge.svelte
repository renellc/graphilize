<script lang="ts">
  import type Konva from "konva";
  import { Line } from "svelte-konva";

  export let start: { x: number; y: number };
  export let end: { x: number; y: number };

  let line: Konva.Line;
  $: line,
    (() => {
      if (!line) {
        return;
      }

      line.moveToBottom();
    })();
</script>

<Line
  bind:handle={line}
  config={{
    stroke: "black",
    fill: "black",
    points: [start.x, start.y, end.x, end.y],
  }}
/>
