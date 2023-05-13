<script lang="ts">
  import type Konva from "konva";
  import { Stage } from "svelte-konva";

  let stage: Konva.Stage;
</script>

<Stage config={{ width: 5000, height: 5000 }} bind:handle={stage} />
