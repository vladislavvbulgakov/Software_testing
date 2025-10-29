const Graph = require('../src/Graph');
const GraphReader = require('../src/GraphReader');
const GraphWriter = require('../src/GraphWriter');

jest.mock('../src/GraphReader');
jest.mock('../src/GraphWriter');

test('isConnected()', () => {
    const mockReader = new GraphReader();

    mockReader.read.mockReturnValue([
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0]
    ]);

    const graph = new Graph(Graph.adjacencyToIncidence(mockReader.read()));

    expect(graph.isConnected()).toBe(true);

    expect(mockReader.read).toHaveBeenCalled();
});

test('GraphWriter', () => {
    const mockReader = new GraphReader();
    const mockWriter = new GraphWriter();

    mockReader.read.mockReturnValue([
        [0, 1],
        [1, 0]
    ]);

    const graph = new Graph(Graph.adjacencyToIncidence(mockReader.read()));
    mockWriter.write.mockReturnValue([
        '0 1\n1 0\n'
    ])
    mockWriter.write('output.txt', [[0, 1], [1, 0]]);

    expect(mockWriter.write).toHaveBeenCalledWith('output.txt', [[0, 1], [1, 0]]);
});