const bs = require('binary-search');

class NodeFactory {
    constructor(graph) {
        this.graph = graph;
    }
    getNode(nodeId){
        let index = bs(this.graph, nodeId, (node, needle) => node.id - needle);
        return this.graph[index];
    }
    getNeighbors(node){
        return node.successors.map(s => this.graph[s]);
    }
}

module.exports = NodeFactory;