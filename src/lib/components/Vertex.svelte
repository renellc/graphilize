<script lang="ts">
  import type Konva from "konva";
  import type { KonvaEventObject } from "konva/lib/Node";
  import { Circle, Group, Text } from "svelte-konva";

  const CIRCLE_RADIUS = 20;
  const CIRCLE_DIAMETER = CIRCLE_RADIUS * 2;

  export let x: number;
  export let y: number;
  export let label: string | null = null;
  export let draggable: boolean = true;

  export let onDragMove: (
    event: KonvaEventObject<MouseEvent>
  ) => void | undefined = undefined;

  export let onMouseDown: (
    event: KonvaEventObject<MouseEvent>
  ) => void | undefined = undefined;

  export let onMouseUp: (
    event: KonvaEventObject<MouseEvent>
  ) => void | undefined = undefined;

  let group: Konva.Group;
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
  bind:handle={group}
  config={{
    x,
    y,
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    draggable,
  }}
  on:dragmove={(event) => onDragMove && onDragMove(event.detail)}
  on:mousedown={(event) => onMouseDown && onMouseDown(event.detail)}
  on:mouseup={(event) => onMouseUp && onMouseUp(event.detail)}
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
