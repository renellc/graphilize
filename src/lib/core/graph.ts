export type Vertex = Record<string, string>;

export const GraphTypes = ["undirected", "directed"] as const;
export type GraphType = typeof GraphTypes[number];

export type Graph = {
  type: GraphType,
  weighted: boolean,
  vertices: Vertex[];
  adjMatrix: number[][];
};

/**
 * Adds a new vertex to a Graph
 * @returns A new Graph object with the added vertex.
 */
export function addVertexToUndirectedGraph(input: { graph: Graph }): Graph {
  const { graph: oldGraph } = input;
  const newGraph: Graph = { ...oldGraph };

  for (let i = 0; i < oldGraph.adjMatrix.length; i++) {
    newGraph.adjMatrix[i].push(0);
  }

  newGraph.vertices.push({});
  newGraph.adjMatrix.push(new Array(newGraph.vertices.length).fill(0));
  return newGraph;
}

export function removeVertexFromUndirectedGraph(input: { graph: Graph, vertex: number }): Graph {
  const { graph: oldGraph, vertex } = input;
  const newGraph: Graph = { ...oldGraph };

  newGraph.vertices.splice(vertex, 1);
  newGraph.adjMatrix.splice(vertex, 1);

  for (let i = 0; i < oldGraph.adjMatrix.length; i++) {
    newGraph.adjMatrix[i].splice(vertex, 1);
  }

  return newGraph;
}

export function addEdgeToUndirectedGraph(input: {
  graph: Graph,
  u: number,
  v: number,
  weight?: number,
}): Graph {
  const { graph: oldGraph, u, v, weight } = input;
  const newGraph: Graph = { ...oldGraph };

  if (oldGraph.weighted) {
    newGraph.adjMatrix[u][v] = weight;
    newGraph.adjMatrix[v][u] = weight;
  } else {
    newGraph.adjMatrix[u][v] = 1;
    newGraph.adjMatrix[v][u] = 1;
  }

  return newGraph;
}

export function removeEdgeFromUndirectedGraph(input: {
  graph: Graph,
  u: number,
  v: number,
}): Graph {
  const { graph, u, v } = input;
  const newGraph: Graph = { ...graph };

  newGraph.adjMatrix[u][v] = 0;
  newGraph.adjMatrix[v][u] = 0;

  return newGraph;
}
