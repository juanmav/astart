const OpenSet = require('./openset');
const { pathTo } = require('./path-geojson-utils');

async function AStarPath(startId, endId, nodeBuilder, progressWrite){

    let startNode = nodeBuilder.getNode(startId);
    let endNode = nodeBuilder.getNode(endId);

    //console.log(startNode.setGCost(startNode));
    //console.log(startNode.setHCost(endNode));

    const openSet = new OpenSet();
    let currentNode = startNode;

    do {
        // Progress writer
        Math.random() <= 0.001 ? progressWrite(currentNode) : null;
        // Normal case put currentNode from open to closed
        currentNode.closed = true;
        // Process its neighbors.
        const neighbors = nodeBuilder.getNeighbors(currentNode);

        neighbors.forEach(neighbor =>{
            if (!neighbor.closed) {
                let gScore = currentNode.g + neighbor.getCostFromNode(currentNode);
                let pristine = neighbor.pristine;

                if (pristine) {
                    neighbor.pristine = false;
                    neighbor.parent = currentNode;
                    neighbor.setHCost(endNode);
                    neighbor.setGCost(currentNode);
                    // put the node to the openSet to be evaluated
                    openSet.push(neighbor);
                } else if (gScore < neighbor.g){
                    // Already seen the node, however a better path found so it must be "float" from the openSet
                    neighbor.parent = currentNode;
                    neighbor.setHCost(endNode);
                    neighbor.setGCost(currentNode);
                    openSet.float(openSet.indexOf(neighbor));
                } else {
                    //console.log('Nor pristine nor better path');
                }
            } else {
                //console.log('the node was already closed');
            }
        });
        currentNode = openSet.pop();
    } while (openSet.length && (currentNode.id !== endNode.id));

    return pathTo(currentNode);

}

module.exports = AStarPath;