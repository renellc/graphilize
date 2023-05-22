import { writable } from "svelte/store";

export type CanvasStore = {
  isDrawing: boolean;
  vertexElements: Map<number, { x: number, y: number }>;
  edgeElements: { fromVertex: number, toVertex: number, directed?: boolean }[];
};

const createCanvasStore = () => {
  const { subscribe, update } = writable<CanvasStore>({
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
    removeVertexElement: (vertexIdx: number) => update((prev) => {
      const store = { ...prev, vertexElements: new Map(prev.vertexElements), edgeElements: [...prev.edgeElements] };

      // Update vertex indices
      const vertices = [...store.vertexElements].sort((a, b) => a[0] - b[0]);
      for (let i = vertexIdx; i < vertices.length; i++) {
        vertices[i][0] -= 1;
      }

      vertices.splice(vertexIdx, 1);
      store.vertexElements = new Map(vertices);

      store.edgeElements = store.edgeElements
        .filter((edge) => edge.fromVertex !== vertexIdx && edge.toVertex !== vertexIdx) // Removes edges
        .map((edge) => ({  // Updates all vertex indices if vertex being removed is less than it
          ...edge,
          fromVertex: edge.fromVertex > vertexIdx ? edge.fromVertex - 1 : edge.fromVertex,
          toVertex: edge.toVertex > vertexIdx ? edge.toVertex - 1 : edge.toVertex,
        }));

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
