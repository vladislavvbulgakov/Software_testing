import fs from 'fs';
import { load } from 'cheerio';

export default class GraphReader {
    read(filePath) {
        const data = fs.readFileSync(filePath, 'utf8');
        const ext = filePath.split('.').pop();

        if (ext === 'txt') {
            return this.parseTxt(data);
        } else if (ext === 'html') {
            return this.parseHtml(data);
        } else {
            throw new Error('Unsupported file format');
        }
    }

    parseTxt(data) {
        const lines = data.trim().split('\n');
        return lines.map(line => line.split(' ').map(Number));
    }

    parseHtml(data) {
        const $ = load(data);
        const table = $('table');
        if (!table.length) {
            throw new Error('Не найдена таблица в HTML документе');
        }

        const adjacencyMatrix = [];
        table.find('tr').each((i, row) => {
            const rowValues = [];
            $(row).find('td').each((j, cell) => {
                rowValues.push(parseInt($(cell).text(), 10));
            });
            if (rowValues.length) {
                adjacencyMatrix.push(rowValues);
            }
        });

        return adjacencyMatrix;
    }
}
