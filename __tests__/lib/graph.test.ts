import { describe, it, expect } from "vitest";

import * as graphLib from "../../src/lib/graph";

describe("Graph operation tests", () => {
  describe("Undirected Graphs", () => {
    it("Should correctly add a vertex to an undirected graph", () => {
      const graph: graphLib.Graph = {
        type: "undirected",
        weighted: false,
        vertices: [],
        adjacencyMatrix: [],
      };

      const newGraph = graphLib.addVertexToUndirectedGraph({ graph });
      expect(newGraph.vertices.length).toStrictEqual(1);
      expect(newGraph.adjacencyMatrix.length).toStrictEqual(1);
    });

    it("Should correctly add an edge to an undirected graph", () => {
      let graph: graphLib.Graph = {
        type: "undirected",
        weighted: false,
        vertices: [],
        adjacencyMatrix: [],
      };

      graph = graphLib.addVertexToUndirectedGraph({ graph });
      graph = graphLib.addVertexToUndirectedGraph({ graph });
      graph = graphLib.addVertexToUndirectedGraph({ graph });
      graph = graphLib.addVertexToUndirectedGraph({ graph });

      graph = graphLib.addEdgeToUndirectedGraph({ graph, fromVertexIdx: 0, toVertexIdx: 1 });
      graph = graphLib.addEdgeToUndirectedGraph({ graph, fromVertexIdx: 0, toVertexIdx: 2 });
      expect(graph.adjacencyMatrix[0][1]).toStrictEqual(1);
      expect(graph.adjacencyMatrix[1][0]).toStrictEqual(1);
      expect(graph.adjacencyMatrix[0][2]).toStrictEqual(1);
      expect(graph.adjacencyMatrix[2][0]).toStrictEqual(1);
    });

    it("Should correctly remove a vertex from an undirected graph", () => {
      let graph: graphLib.Graph = {
        type: "undirected",
        weighted: false,
        vertices: [],
        adjacencyMatrix: [],
      };

      graph = graphLib.addVertexToUndirectedGraph({ graph });
      graph = graphLib.addVertexToUndirectedGraph({ graph });
      graph = graphLib.addVertexToUndirectedGraph({ graph });
      graph = graphLib.addVertexToUndirectedGraph({ graph });

      graph = graphLib.addEdgeToUndirectedGraph({ graph, fromVertexIdx: 0, toVertexIdx: 1 });
      graph = graphLib.addEdgeToUndirectedGraph({ graph, fromVertexIdx: 0, toVertexIdx: 2 });

      graph = graphLib.removeVertexFromUndirectedGraph({ graph, vertexIdx: 0 });
      expect(graph.vertices.length).toStrictEqual(3);
      expect(graph.adjacencyMatrix.length).toStrictEqual(3);
      expect(graph.adjacencyMatrix[0][1]).toEqual(0);
      expect(graph.adjacencyMatrix[1][0]).toEqual(0);
      expect(graph.adjacencyMatrix[0][2]).toEqual(0);
      expect(graph.adjacencyMatrix[2][0]).toEqual(0);
    });
  });
});
