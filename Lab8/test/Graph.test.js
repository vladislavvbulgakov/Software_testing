const Graph = require('../src/Graph');

const mockIncidenceMatrix = [
    [1, 0, 1],
    [1, 1, 0],
    [0, 1, 1]
];

test('Graph связный', () => {
    const graph = new Graph(mockIncidenceMatrix);
    expect(graph.isConnected()).toBe(true);
});

test('Graph корректный выходной формат - список связности', () => {
    const graph = new Graph(mockIncidenceMatrix);
    const edgeList = graph.toEdgeList();
    expect(edgeList).toEqual([[0, 1], [1, 2], [0, 2]]);
});