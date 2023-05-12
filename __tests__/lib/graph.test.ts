import { describe, it, expect } from "vitest";

import * as graphLib from "@/core";

describe("Graph operation tests", () => {
  describe("Undirected Graphs", () => {
    it("Should correctly add a vertex to an undirected graph", () => {
      const graph: graphLib.Graph = {
        type: "undirected",
        weighted: false,
        vertices: [],
        adjMatrix: [],
      };

      const newGraph = graphLib.addVertexToUndirectedGraph({ graph });
      expect(newGraph.vertices.length).toStrictEqual(1);
      expect(newGraph.adjMatrix.length).toStrictEqual(1);
    });

    it("Should correctly add an edge to an undirected graph", () => {
      let graph: graphLib.Graph = {
        type: "undirected",
        weighted: false,
        vertices: [],
        adjMatrix: [],
      };

      graph = graphLib.addVertexToUndirectedGraph({ graph });
      graph = graphLib.addVertexToUndirectedGraph({ graph });
      graph = graphLib.addVertexToUndirectedGraph({ graph });
      graph = graphLib.addVertexToUndirectedGraph({ graph });

      graph = graphLib.addEdgeToUndirectedGraph({ graph, u: 0, v: 1 });
      graph = graphLib.addEdgeToUndirectedGraph({ graph, u: 0, v: 2 });
      expect(graph.adjMatrix[0][1]).toStrictEqual(1);
      expect(graph.adjMatrix[1][0]).toStrictEqual(1);
      expect(graph.adjMatrix[0][2]).toStrictEqual(1);
      expect(graph.adjMatrix[2][0]).toStrictEqual(1);
    });

    it("Should correctly remove a vertex from an undirected graph", () => {
      let graph: graphLib.Graph = {
        type: "undirected",
        weighted: false,
        vertices: [],
        adjMatrix: [],
      };

      graph = graphLib.addVertexToUndirectedGraph({ graph });
      graph = graphLib.addVertexToUndirectedGraph({ graph });
      graph = graphLib.addVertexToUndirectedGraph({ graph });
      graph = graphLib.addVertexToUndirectedGraph({ graph });

      graph = graphLib.addEdgeToUndirectedGraph({ graph, u: 0, v: 1 });
      graph = graphLib.addEdgeToUndirectedGraph({ graph, u: 0, v: 2 });

      graph = graphLib.removeVertexFromUndirectedGraph({ graph, vertex: 0 });
      expect(graph.vertices.length).toStrictEqual(3);
      expect(graph.adjMatrix.length).toStrictEqual(3);
      expect(graph.adjMatrix[0][1]).toEqual(0);
      expect(graph.adjMatrix[1][0]).toEqual(0);
      expect(graph.adjMatrix[0][2]).toEqual(0);
      expect(graph.adjMatrix[2][0]).toEqual(0);
    });
  });
});
