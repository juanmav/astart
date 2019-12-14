const Node = require('./node');

class NodeFactoryDB {
    constructor(graph, db) {
        this.db = db;
        this.graph = graph;
    }

    getNode(nodeId){
        let record = this.db.prepare('SELECT * FROM nodes WHERE id = ?').get(nodeId);
        let node = this.createNode(record);
        return node;
    }

    createNode = (record)=> {
        let node = new Node (
            record.id,
            record.name === 'null' ? null : record.name,
            record.latitude,
            record.longitude
        );
        this.graph.push(node);
        return node;
    };


    /**
     * This functions does two things,
     * 1- check if the node is already in the graph if not it create it.
     * 2- return all the neighbors from a given node.
     * */
    getNeighbors(node){
        let data = this.db.prepare(`SELECT * from nodes
                                      WHERE id IN (
                                          SELECT destination FROM relations
                                          where source = ?
                                      )`)
            .all(node.id);
        let classifiedNodes = data.reduce((result, record) => {
            let n = this.graph.get(record);
            n ? result.alreadyDiscoveredNodes.push(n) : result.newNodes.push(record);
            return  result;
        }, {alreadyDiscoveredNodes: [], newNodes: []});

        return classifiedNodes.alreadyDiscoveredNodes.concat(classifiedNodes.newNodes.map(this.createNode));
    }

}

module.exports = NodeFactoryDB;