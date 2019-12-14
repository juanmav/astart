const Heap = require("collections/heap");

// The open set is sorted by the nodes f value.
// and is a priority queue this means a binary heap.
class OpenSet {
    constructor(){
        return new Heap(
            [],
            (a,b) => a.id === b.id,
            (a, b) => b.f - a.f
        );
    }
}

module.exports = OpenSet;