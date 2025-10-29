const fs = require('fs');

class GraphWriter {
    write(filePath, edgeList) {
        const ext = filePath.split('.').pop();

        if (ext === 'txt') {
            this.writeTxt(filePath, edgeList);
        } else if (ext === 'html') {
            this.writeHtml(filePath, edgeList);
        } else {
            throw new Error('Unsupported file format');
        }
    }

    writeTxt(filePath, edgeList) {
        let output = '';
        for (const [v1, v2] of edgeList) {
            output += `${v1} ${v2}\n`;
        }
        fs.writeFileSync(filePath, output);
    }

    writeHtml(filePath, edgeList) {
        let html = '<table border="1">\n';
        for (const [v1, v2] of edgeList) {
            html += `  <tr><td>${v1}</td><td>${v2}</td></tr>\n`;
        }
        html += '</table>';
        fs.writeFileSync(filePath, html);
    }
}

module.exports = GraphWriter;