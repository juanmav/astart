const fs = require('fs');
const readline = require('readline');
const bs = require('binary-search');

//### Format: way|@id|@name|@place|@highway|@route|@ref|@oneway|@maxspeed|member nodes|...


async function processNodesLineByLine(file) {
    const nodes = [];
    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        nodes.push(processNodeLine(line));
    }
    return  nodes;
}

function processNodeLine(line){
    const splitLine = line.split('|');
    const node = {
        id: parseInt(splitLine[1]),
        name: splitLine[2] ? splitLine[2]: null,
        latitude: parseFloat(splitLine[9]),
        longitude: parseFloat(splitLine[10]),
        successors: []
    };
    console.log(`INSERT INTO nodes values(${node.id},"${node.name}",${node.latitude},${node.longitude},0);`);
    return node;
}

async function processWaysLineByLine(file, nodes) {
    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        processWayLine(line, nodes)
    }
}

function nodesToInsert(nodes){
    const result = nodes.reduce( (acc, node, index) => {
        return nodes[index + 1] ? acc.concat([[node, nodes[index+ 1 ]]]): acc;
    },[]);
    return result.map(tuple => `INSERT INTO relations VALUES (${tuple[0]}, ${tuple[1]});`).join('\n');
}

function processWayLine(line, graph) {
    const splitLine = line.split('|');
    const oneWay = !!splitLine[7];
    let nodesNumbers = splitLine.slice(9);
    nodesNumbers = nodesNumbers.filter(number => bs(graph, number, (node, needle) => node.id - needle) >= 0);
    let nodesIndexes = nodesNumbers.map(number => bs(graph, number, (node, needle) => node.id - needle));
    if (oneWay){
        console.log(nodesToInsert(nodesNumbers));
        connectNodes(nodesIndexes, graph);
    } else {
        console.log(nodesToInsert(nodesNumbers));
        connectNodes(nodesIndexes, graph);
        console.log(nodesToInsert(nodesNumbers.reverse()));
        connectNodes(nodesIndexes.reverse(), graph);
    }
}

function connectNodes(indexes, graph){
    indexes.forEach((nodeIndex, index) => {
        if(index + 1 <= indexes.length - 1){
            graph[nodeIndex].successors.push(indexes[index+1]);
        }
    })
}

(async () => {
    let nodes = await processNodesLineByLine('../raw/nodes.csv');
    await processWaysLineByLine('../raw/ways.csv', nodes);
    writeGraphToBinaryFile(nodes, '../raw/nodes.bin');
    writeGraphToFile(nodes,'../raw/nodes.json' )
})();

function writeGraphToFile(nodes, file){
    const fs = require('fs');
    let writeStream = fs.createWriteStream(file);
    nodes.forEach(n => writeStream.write(JSON.stringify(n)+'\n', 'utf8'));
}

function writeGraphToBinaryFile(nodes, file){
    const fs = require('fs');
    let writeStream = fs.createWriteStream(file);
    nodes.forEach(node => writeStream.write(nodeToBuffer(node)));
}

function nodeToBuffer(n){
    let size = 13 + n.successors.length * 4;
    let buffer = Buffer.allocUnsafe(size);

    buffer.writeUInt32BE(n.id, 0);
    buffer.writeFloatBE(n.latitude, 4);
    buffer.writeFloatBE(n.longitude, 8);
    buffer.writeUInt8(n.successors.length, 12);

    const offset = 13;

    n.successors.forEach( (number, index)=> buffer.writeUInt32BE(number, offset + index * 4));

    return buffer;

}