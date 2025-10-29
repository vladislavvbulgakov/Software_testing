import { jest, describe, it, beforeEach, beforeAll } from '@jest/globals';
import { assert } from 'chai';

let mockGraphReaderRead;
let mockGraphWriterWrite;

jest.unstable_mockModule('../src/GraphReader.js', () => {
  mockGraphReaderRead = jest.fn();
  return {
    default: jest.fn().mockImplementation(() => ({
      read: mockGraphReaderRead,
    })),
  };
});

jest.unstable_mockModule('../src/GraphWriter.js', () => {
  mockGraphWriterWrite = jest.fn();
  return {
    default: jest.fn().mockImplementation(() => ({
      write: mockGraphWriterWrite,
    })),
  };
});

let Graph, GraphReader, GraphWriter, mockReader, mockWriter;

beforeAll(async () => {
  const graphModule = await import('../src/Graph.js');
  Graph = graphModule.default;

  const graphReaderModule = await import('../src/GraphReader.js');
  GraphReader = graphReaderModule.default;
  mockReader = new GraphReader();

  const graphWriterModule = await import('../src/GraphWriter.js');
  GraphWriter = graphWriterModule.default;
  mockWriter = new GraphWriter();
});

describe('ChaiGraphTest', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockGraphReaderRead.mockReturnValue([
      [0, 1, 0, 1],
      [1, 0, 1, 0],
      [0, 1, 0, 1],
      [1, 0, 1, 0],
    ]);

    mockGraphWriterWrite.mockImplementation(() => {});
  });

  it('isConnected()', async () => {
    const adjacencyMatrix = mockReader.read();
    const incidenceMatrix = Graph.adjacencyToIncidence(adjacencyMatrix);
    const graph = new Graph(incidenceMatrix);

    assert.isTrue(graph.isConnected());
  });

  it('isNotConnected()', async () => {
    mockGraphReaderRead.mockReturnValue([
      [0, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
    ]);

    const adjacencyMatrix = mockReader.read();
    const incidenceMatrix = Graph.adjacencyToIncidence(adjacencyMatrix);
    const graph = new Graph(incidenceMatrix);

    assert.isFalse(graph.isConnected());
  });

  it('writeGraphTxt()', async () => {
    const adjacencyMatrix = mockReader.read();
    const incidenceMatrix = Graph.adjacencyToIncidence(adjacencyMatrix);
    const graph = new Graph(incidenceMatrix);
    const edgeList = graph.toEdgeList();

    mockWriter.write('output.txt', edgeList);

    assert.strictEqual(mockGraphWriterWrite.mock.calls.length, 1);
  });

  it('writeGraphHtml()', async () => {
    const adjacencyMatrix = mockReader.read();
    const incidenceMatrix = Graph.adjacencyToIncidence(adjacencyMatrix);
    const graph = new Graph(incidenceMatrix);
    const edgeList = graph.toEdgeList();

    mockWriter.write('output.html', edgeList);

    assert.strictEqual(mockGraphWriterWrite.mock.calls.length, 1);
  });

  it('graphReaderTxt()', async () => {
    const adjacencyMatrix = mockReader.read();
    const incidenceMatrix = Graph.adjacencyToIncidence(adjacencyMatrix);
    const graph = new Graph(incidenceMatrix);

    assert.strictEqual(mockGraphReaderRead.mock.calls.length, 1);
  });

  it('graphReaderHtml()', async () => {
    const htmlData = `
      <table>
        <tr><td>0</td><td>1</td></tr>
        <tr><td>1</td><td>0</td></tr>
      </table>
    `;
    
    const freshReader = new GraphReader();
    
    const mockRead = jest.spyOn(freshReader, 'read').mockReturnValue([[0, 1], [1, 0]]);
    
    const result = freshReader.read('test.html');
    
    const expectedMatrix = [
      [0, 1],
      [1, 0]
    ];
    
    assert.deepStrictEqual(result, expectedMatrix);
    assert.strictEqual(mockRead.mock.calls.length, 1);
    
    mockRead.mockRestore();
  });
    it('toEdgeList() с numEdges = 1', () => {
        const incidenceMatrix = [
            [0], 
        ];
        const graph = new Graph(incidenceMatrix);
        const edgeList = graph.toEdgeList();
        assert.deepStrictEqual(edgeList, []);
    });
    it('toEdgeList() с матрицей содержащей 1', () => {
        const incidenceMatrix = [
            [1], 
            [1], 
        ];
        const graph = new Graph(incidenceMatrix);
        const edgeList = graph.toEdgeList();
        assert.deepStrictEqual(edgeList, [[0, 1]]);
    });
    it('toEdgeList() test', () => {
        const incidenceMatrix = [
            [1, 0, 1], 
            [1, 1, 0], 
            [0, 1, 1], 
        ];
        const graph = new Graph(incidenceMatrix);
        const edgeList = graph.toEdgeList();
        assert.deepStrictEqual(edgeList, [[0, 1], [1, 2], [0, 2]]);
    });
    it('isConnected() с numVertices = 0', () => {
        const incidenceMatrix = [];
        const graph = new Graph(incidenceMatrix);
        assert.isTrue(graph.isConnected());
    });
    it('adjacencyToIncidence() с j = i -1', () => {
        const adjacencyMatrix = [
            [0, 1],
            [1, 0],
        ];
        const incidenceMatrix = Graph.adjacencyToIncidence(adjacencyMatrix);
        assert.deepStrictEqual(incidenceMatrix, [[1], [1]]);
    });
    it('toEdgeList() test 1', () => {
        const incidenceMatrix = [
            [1, 0, 0], 
            [1, 1, 0], 
            [0, 1, 1], 
        ];
        const graph = new Graph(incidenceMatrix);
        const edgeList = graph.toEdgeList();

        assert.deepStrictEqual(edgeList, [[0, 1], [1, 2]]); 
    });
    
});