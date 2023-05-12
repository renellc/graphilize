export type Vertex = Record<string, string>;

export const GraphTypes = ["undirected", "directed"] as const;
type GraphTypeInternal = typeof GraphTypes;
export type GraphType = GraphTypeInternal[number];

export type Graph = {
  type: GraphType,
  weighted: boolean,
  vertices: Vertex[];
  adjacencyMatrix: number[][];
};

/**
 * Adds a new vertex to a Graph
 * @returns A new Graph object with the added vertex.
 */
export function addVertexToUndirectedGraph(input: { graph: Graph }): Graph {
  const { graph: oldGraph } = input;
  const newGraph: Graph = { ...oldGraph };

  for (let i = 0; i < oldGraph.adjacencyMatrix.length; i++) {
    newGraph.adjacencyMatrix[i].push(0);
  }

  newGraph.vertices.push({});
  newGraph.adjacencyMatrix.push(new Array(newGraph.vertices.length).fill(0));
  return newGraph;
}

export function removeVertexFromUndirectedGraph(input: { graph: Graph, vertexIdx: number }): Graph {
  const { graph: oldGraph, vertexIdx } = input;
  const newGraph: Graph = { ...oldGraph };

  newGraph.vertices.splice(vertexIdx, 1);
  newGraph.adjacencyMatrix.splice(vertexIdx, 1);

  for (let i = 0; i < oldGraph.adjacencyMatrix.length; i++) {
    newGraph.adjacencyMatrix[i].splice(vertexIdx, 1);
  }

  return newGraph;
}

export function addEdgeToUndirectedGraph(input: {
  graph: Graph,
  fromVertexIdx: number,
  toVertexIdx: number,
  weight?: number,
}): Graph {
  const { graph: oldGraph, fromVertexIdx: from, toVertexIdx: to, weight } = input;
  const newGraph: Graph = { ...oldGraph };

  if (oldGraph.weighted) {
    newGraph.adjacencyMatrix[from][to] = weight;
    newGraph.adjacencyMatrix[to][from] = weight;
  } else {
    newGraph.adjacencyMatrix[from][to] = 1;
    newGraph.adjacencyMatrix[to][from] = 1;
  }

  return newGraph;
}
