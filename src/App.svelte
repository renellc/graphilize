<script lang="ts">
  import Header from "@/components/Header.svelte";
  import GraphPlayground from "@/components/GraphPlayground.svelte";
</script>

<Header />
<main class="main">
  <section style="background-color: blue;">sidebar</section>
  <GraphPlayground />
</main>

<style>
  .main {
    display: grid;
    grid-template-columns: 15% 1fr;
    grid-template-areas: "sidebar graph-area";

    width: 100%;
    height: 98%;

    overflow: hidden;
  }
</style>
