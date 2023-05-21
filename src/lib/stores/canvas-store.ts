import { writable } from "svelte/store";

import type Konva from "konva";

export type CanvasStore = {
  isDrawing: boolean;
  vertexElements: Map<number, { x: number, y: number }>;
  edgeElements: { fromVertex: number, toVertex: number, directed?: boolean }[];
};

const createCanvasStore = () => {
  const { subscribe, set, update } = writable<CanvasStore>({
    isDrawing: false,
    vertexElements: new Map(),
    edgeElements: []
  });

  return {
    subscribe,
    setIsDrawing: (isDrawing: boolean) => update((prev) => ({ ...prev, isDrawing })),
    addVertexElement: (input: { vertexIdx: number, x: number, y: number }) => update((prev) => {
      const { vertexIdx, x, y } = input;
      const store = { ...prev, vertexElements: new Map(prev.vertexElements), edgeElements: [...prev.edgeElements] };

      store.vertexElements.set(vertexIdx, { x, y });
      return store;
    }),
    updateVertexElement: (vertexIdx: number, input: { x: number, y: number }) => update((prev) => {
      const { x, y } = input;
      const store = { ...prev, vertexElements: new Map(prev.vertexElements), edgeElements: [...prev.edgeElements] };
      store.vertexElements.set(vertexIdx, { x, y });
      return store;
    }),
    addEdgeElement: (input: { fromVertexId: number, toVertexId: number, directed?: boolean }) => update((prev) => {
      const { fromVertexId, toVertexId, directed } = input;
      const store = { ...prev, vertexElements: new Map(prev.vertexElements), edgeElements: [...prev.edgeElements] };
      store.edgeElements.push({
        fromVertex: fromVertexId,
        toVertex: toVertexId,
        directed,
      });
      return store;
    }),
  };
};

export const canvasStore = createCanvasStore();
