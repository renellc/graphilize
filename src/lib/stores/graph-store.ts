import { writable } from "svelte/store";
import { addVertexToGraph, removeVertixFromGraph, type Graph, addEdgeToGraph } from "@/core";

const createGraphStore = () => {
  const { set, subscribe, update } = writable<Graph>({
    type: "undirected",
    weighted: false,
    vertices: [],
    adjMatrix: [],
  });

  return {
    subscribe,
    setGraphType: (type: string) => update((graph) => {
      if (type !== "undirected" && type !== "directed") {
        return;
      }

      graph.type = type;
      return graph;
    }),
    addVertex: (coords: { x: number, y: number }) => update((graph) => {
      switch (graph.type) {
        case "undirected": {
          return addVertexToGraph({ graph, x: coords.x, y: coords.y });
        }
        default:
          return graph;
      }
    }),
    removeVertex: (vertexIdx: number) => update((graph) => {
      switch (graph.type) {
        case "undirected":
          return removeVertixFromGraph({ graph, vertex: vertexIdx });
        default:
          return graph;
      }
    }),
    addEdge: (input: { fromVertexIdx: number, toVertexIdx: number, weight?: number }) => update((graph) => {
      const { fromVertexIdx, toVertexIdx, weight } = input;
      switch (graph.type) {
        case "undirected":
          return addEdgeToGraph({ graph, u: fromVertexIdx, v: toVertexIdx, weight })
        default:
          break;
      }
    }),
  };
};

export const graphStore = createGraphStore();
