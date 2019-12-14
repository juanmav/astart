const SortedArray = require("collections/sorted-array");

// This structure represents the "discovered" graph
// the nodes are created from the database.
// before creation a new node from database first we check
// here to prevent duplicates.
class Graph {
    constructor(){
        return new SortedArray(
            null,
            (a,b) => a.id === b.id,
            (a,b) => b.id - a.id
        );
    }
}

module.exports = Graph;