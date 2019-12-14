const AStarPath = require('./astar');
const betterSqlite3 = require('better-sqlite3');
const fs = require('fs');
const { pathToGeoJson, pathTo, getLineString, nodeToGeoJsonFeaturePoint, graphToGeoJson } = require('./path-geojson-utils');
const perf = require('execution-time')(console.log);
const Graph = require('./graph');
const NodeFactoryDB = require('./nodefactory-db');
const NodeFactory = require('./nodefactory');
const readline = require('readline');
const Node = require('./node');

(async () => {

    function progressChecker(currentNode){
        alternatives.push(getLineString(pathTo(currentNode)));
    }

    /*Database Instance, Graph and NodeFactory*/
    console.log('Loading DB');
    perf.start();
    const partialGraph = new Graph();
    const db = betterSqlite3('./database.sqlite');
    const nodeFactoryDB = new NodeFactoryDB(partialGraph, db);//*/
    perf.stop();

    let startingNodeId = 240949599;
    let uabCRMNodeId = 319306117;
    let sevillaNodeId = 195977239;

    console.log('Start node to UAB CRM');
    perf.start();
    let alternatives = [];
    let path1 = await AStarPath(
        startingNodeId,
        uabCRMNodeId,
        nodeFactoryDB,
        progressChecker
    );
    perf.stop();

    /* Graph from file Solution*/
    //const graph = await retrieveGraphFromFile(/*'./nodes.json'*/);
    console.log('Loading bin File');
    perf.start();
    const graph = await retrieveGraphFromBinaryFile('./nodes.bin');
    const nodeFactory = new NodeFactory(graph);//*/
    perf.stop();

    writeResults(path1, alternatives);

    console.log('Start node to Sevilla');
    perf.start();
    alternatives = [];
    let path2 = await AStarPath(
        startingNodeId,
        sevillaNodeId,
        nodeFactory,
        progressChecker
    );
    perf.stop();

    writeResults(path2, /*alternatives*/);

})();

function writeResults(path, alternatives, graph){
    let nameResult = new Date().toISOString()+'.json';
    fs.writeFileSync("./runs/" + nameResult, JSON.stringify(pathToGeoJson(path, alternatives),null,4));
    //fs.writeFileSync("./runs/graph" + nameResult, JSON.stringify(graphToGeoJson(graph), null, 4));
}

async function retrieveGraphFromFile(file) {
    const nodes = [];
    const fileStream = fs.createReadStream(file);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        let record = JSON.parse(line);
        nodes.push(new Node(record.id, record.name, record.latitude, record.longitude, record.successors));
    }
    return  nodes;
}

function retrieveGraphFromBinaryFile(file){
    return new Promise((resolve, reject) => {
        fs.readFile(file, function(err, data) {
            let offset = 0;
            let graph = [];
            for ( let j = 0; j <= 23895680; j++ ){
                let read = nodeFromBuffer(data, offset);
                offset = read.offset;
                graph.push(read.node);
            }
            resolve(graph);
        });
    });
}

function nodeFromBuffer(buffer, offset = 0){
    let localOffset = 13;
    let id = buffer.readUInt32BE(offset);
    let name = null;
    let latitude = buffer.readFloatBE(offset +4);
    let longitude = buffer.readFloatBE(offset + 8);
    let sc = buffer.readUInt8(offset + 12);
    let successors = [...Array(sc).keys()].map( i => buffer.readUInt32BE( offset+ i * 4 + localOffset));
    return {
        node: new Node(id, name, latitude, longitude, successors),
        offset: offset + localOffset + sc * 4
    };
}

function retrieveGraphFromFile(file) {
    const nodes = [];
    const fileStream = fs.createReadStream(file);
    const es = require('event-stream');

    return new Promise((resolve, reject)=> {
        fileStream
            .pipe(es.split())
            .pipe(es.mapSync((line) => {
                if (line.length){
                    let record = JSON.parse(line);
                    nodes.push(new Node(record.id, record.name, record.latitude, record.longitude, record.successors));
                }
            }))
            .on('error', function(err) {
                console.log('Error while reading file.', err);
                reject();
            })
            .on('end', function() {
                resolve(nodes);
            })
    });
}
