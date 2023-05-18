<script lang="ts">
  import type Konva from "konva";
  import { Circle, Group, Text } from "svelte-konva";

  const CIRCLE_RADIUS = 20;
  const CIRCLE_DIAMETER = CIRCLE_RADIUS * 2;

  export let x: number;
  export let y: number;
  export let label: string | null = null;

  let text: Konva.Text;

  $: text,
    (() => {
      if (!text || label === null) {
        return;
      }

      text.x(-text.width() / 2);
      text.y(-text.height() / 2);
      text.moveToTop();
    })();
</script>

<Group
  config={{
    x,
    y,
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    draggable: true,
  }}
>
  <Circle
    config={{
      fill: "white",
      radius: CIRCLE_RADIUS,
      stroke: "#171717",
      strokeWidth: 1,
    }}
  />

  {#if label !== null}
    <Text
      bind:handle={text}
      config={{
        text: label,
        fill: "black",
        fontSize: 16,
        align: "center",
        verticalAlign: "middle",
      }}
    />
  {/if}
</Group>
