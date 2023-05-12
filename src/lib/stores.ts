import { writable } from "svelte/store";
import { addVertexToUndirectedGraph, removeVertexFromUndirectedGraph, type Graph, addEdgeToUndirectedGraph } from "./core/graph";

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
    addVertex: () => update((graph) => {
      switch (graph.type) {
        case "undirected": {
          return addVertexToUndirectedGraph({ graph });
        }
        default:
          return graph;
      }
    }),
    removeVertex: (vertexIdx: number) => update((graph) => {
      switch (graph.type) {
        case "undirected":
          return removeVertexFromUndirectedGraph({ graph, vertex: vertexIdx });
        default:
          return graph;
      }
    }),
    addEdge: (input: { fromVertexIdx: number, toVertexIdx: number, weight?: number }) => update((graph) => {
      const { fromVertexIdx, toVertexIdx, weight } = input;
      switch (graph.type) {
        case "undirected":
          return addEdgeToUndirectedGraph({ graph, vertexUIdx: fromVertexIdx, v: toVertexIdx, weight })
        default:
          break;
      }
    }),
  };
};

export const graphStore = createGraphStore();
