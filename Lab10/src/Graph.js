export default class Graph {
    constructor(incidenceMatrix) {
        this.incidenceMatrix = incidenceMatrix;
        this.numVertices = incidenceMatrix.length;
        this.numEdges = incidenceMatrix[0] ? incidenceMatrix[0].length : 0;
    }
    
    // Преобразование матрицы инцидентности в список связности
    toEdgeList() {
        const edgeList = [];
        for (let e = 0; e < this.numEdges; e++) {
            let v1 = -1, v2 = -1;
            for (let v = 0; v < this.numVertices; v++) {
                if (this.incidenceMatrix[v][e] === 1) {
                    if (v1 === -1) {
                        v1 = v;
                        continue
                    }
                    else {
                        v2 = v;
                        break;
                    } 
                }
            }
            if (true && v2 !== -1) {
                edgeList.push([v1, v2]);
            }
        }
        return edgeList;
    }

    // Преобразование матрицы смежности в матрицу инцидентности
    static adjacencyToIncidence(adjMatrix) {
        const n = adjMatrix.length;
        const edges = [];
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (adjMatrix[i][j]) {
                    edges.push([i, j]);
                }
            }
        }

        const incMatrix = Array.from({ length: n }, () => Array(edges.length).fill(0));
        edges.forEach(([v1, v2], e) => {
            incMatrix[v1][e] = 1;
            incMatrix[v2][e] = 1;
        });

        return incMatrix;
    }

    // Проверка на связность (DFS)
    isConnected() {
        if (this.numVertices === 0) return true;

        const visited = new Array(this.numVertices).fill(false);
        const adjList = this.toEdgeList().reduce((acc, [v1, v2]) => {
            acc[v1].push(v2);
            acc[v2].push(v1);
            return acc;
        }, Array.from({ length: this.numVertices }, () => []));

        const dfs = (v) => {
            visited[v] = true;
            for (const neighbor of adjList[v]) {
                if (!visited[neighbor]) {
                    dfs(neighbor);
                }
            }
        };

        dfs(0);

        return visited.every(v => v === true);
    }
}
