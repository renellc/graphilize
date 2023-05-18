import { writable } from "svelte/store";

import type Konva from "konva";

export type CanvasStore = {
  vertexElements: Map<number, { x: number, y: number }>;
  edgeElements: { fromVertex: number, toVertex: number, directed?: boolean }[];
};

const createCanvasStore = () => {
  const { subscribe, set, update } = writable<CanvasStore>({
    vertexElements: new Map(),
    edgeElements: []
  });

  return {
    subscribe,
    addVertexElement: (input: { vertexIdx: number, x: number, y: number }) => update((prev) => {
      const { vertexIdx, x, y } = input;
      const store: CanvasStore = { vertexElements: new Map(prev.vertexElements), edgeElements: [...prev.edgeElements] };

      store.vertexElements.set(vertexIdx, { x, y });
      return store;
    }),
    addEdgeElement: (input: { fromVertexId: number, toVertexId: number, directed?: boolean }) => update((prev) => {
      const { fromVertexId, toVertexId, directed } = input;
      const store: CanvasStore = { vertexElements: new Map(prev.vertexElements), edgeElements: [...prev.edgeElements] };
      store.edgeElements.push({
        fromVertex: fromVertexId,
        toVertex: toVertexId,
        directed,
      });
      return store;
    })
  };
};

export const canvasStore = createCanvasStore();
