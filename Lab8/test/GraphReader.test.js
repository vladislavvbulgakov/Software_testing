const GraphReader = require('../src/GraphReader');

const mockReadTxt = (data) => {
    const reader = new GraphReader();
    
    const lines = data.trim().split('\n');
    return lines.map(line => line.split(' ').map(Number));
};

const mockReadHtml = (data) => {
    const reader = new GraphReader();
    const cheerio = require('cheerio');
    const $ = cheerio.load(data);
    const adjacencyMatrix = [];
    $('table tr').each((i, row) => {
        const rowValues = [];
        $(row).find('td').each((j, cell) => {
            rowValues.push(parseInt($(cell).text(), 10));
        });
        if (rowValues.length) {
            adjacencyMatrix.push(rowValues);
        }
    });
    return adjacencyMatrix;
};

test('GraphReader .txt', () => {
    const data = "0 1 0\n1 0 1\n0 1 0";
    const result = mockReadTxt(data);
    expect(result).toEqual([
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0]
    ]);
});

test('GraphReader .html', () => {
    const data = `
        <table>
            <tr><td>0</td><td>1</td></tr>
            <tr><td>1</td><td>0</td></tr>
        </table>
    `;
    const result = mockReadHtml(data);
    expect(result).toEqual([
        [0, 1],
        [1, 0]
    ]);
});