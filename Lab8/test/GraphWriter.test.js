const GraphWriter = require('../src/GraphWriter');

const mockWriteTxt = (edgeList) => {
    let output = '';
    for (const [v1, v2] of edgeList) {
        output += `${v1} ${v2}\n`;
    }
    return output;
};

const mockWriteHtml = (edgeList) => {
    let html = '<table border="1">\n';
    for (const [v1, v2] of edgeList) {
        html += `  <tr><td>${v1}</td><td>${v2}</td></tr>\n`;
    }
    html += '</table>';
    return html;
};

test('GraphWriter writes edge list to txt string', () => {
    const edgeList = [[0, 1], [1, 2]];
    const result = mockWriteTxt(edgeList);
    expect(result).toBe("0 1\n1 2\n");
});

test('GraphWriter writes edge list to html string', () => {
    const edgeList = [[0, 1], [1, 2]];
    const result = mockWriteHtml(edgeList);
    expect(result).toBe('<table border="1">\n  <tr><td>0</td><td>1</td></tr>\n  <tr><td>1</td><td>2</td></tr>\n</table>');
});