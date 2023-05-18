import { InvalidEdgeError, InvalidVertexError } from "./errors";

export const GraphTypes = ["undirected", "directed"] as const;
export type GraphType = typeof GraphTypes[number];

export type Graph = {
  type: GraphType,
  weighted: boolean,
  adjMatrix: number[][];
};

/**
 * Adds a new vertex to a Graph
 * @returns A new Graph object with the added vertex.
 */
export function addVertexToGraph(input: { graph: Graph }): Graph {
  const { graph: oldGraph } = input;
  const newGraph: Graph = { ...oldGraph };

  for (let i = 0; i < oldGraph.adjMatrix.length; i++) {
    newGraph.adjMatrix[i].push(0);
  }

  newGraph.adjMatrix.push(new Array(newGraph.adjMatrix.length + 1).fill(0));
  return newGraph;
}

export function removeVertexFromGraph(input: { graph: Graph, vertex: number }): Graph {
  const { graph: oldGraph, vertex } = input;

  if (vertex < 0 || vertex >= oldGraph.adjMatrix.length) {
    throw new InvalidVertexError(`Vertex ${vertex} is an invalid vertex: does not exist`);
  }

  const newGraph: Graph = { ...oldGraph };

  newGraph.adjMatrix.splice(vertex, 1);

  for (let i = 0; i < oldGraph.adjMatrix.length; i++) {
    newGraph.adjMatrix[i].splice(vertex, 1);
  }

  return newGraph;
}

export function addEdgeToGraph(input: {
  graph: Graph,
  u: number,
  v: number,
  weight?: number,
}): Graph {
  const { graph: oldGraph, u, v, weight } = input;

  const isUValidVert = u >= 0 && u < oldGraph.adjMatrix.length;
  const isVValidVert = v >= 0 && v < oldGraph.adjMatrix.length;
  if (!isUValidVert || !isVValidVert) {
    throw new InvalidVertexError("One of vertices U or V is invalid");
  }

  const newGraph: Graph = { ...oldGraph };

  if (oldGraph.weighted) {
    newGraph.adjMatrix[u][v] = weight ?? 1;

    if (oldGraph.type === "undirected") {
      newGraph.adjMatrix[v][u] = weight ?? 1;
    }
  } else {
    newGraph.adjMatrix[u][v] = 1;

    if (oldGraph.type === "undirected") {
      newGraph.adjMatrix[v][u] = 1;
    }
  }

  return newGraph;
}

export function removeEdgeFromGraph(input: {
  graph: Graph,
  u: number,
  v: number,
}): Graph {
  const { graph: oldGraph, u, v } = input;

  const isUValidVert = u >= 0 && u < oldGraph.adjMatrix.length;
  const isVValidVert = v >= 0 && v < oldGraph.adjMatrix.length;
  if (!isUValidVert || !isVValidVert) {
    throw new InvalidEdgeError(`Edge [${u}, ${v}] is an invalid vertex`);
  }

  const newGraph: Graph = { ...oldGraph };

  newGraph.adjMatrix[u][v] = 0;
  newGraph.adjMatrix[v][u] = 0;

  return newGraph;
}
