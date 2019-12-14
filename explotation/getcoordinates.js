const sqlite = require('sqlite');
const {promisify} = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);

let fileListOfNodes = './prof-solution.nodes';

(async () => {
    try {

        let nodeList = await readFileAsync(fileListOfNodes, {encoding: 'utf8'});
        nodeList = nodeList.split('\n').join(',').slice(0, -1);
        const db = await sqlite.open('../database.sqlite');
        const query = `SELECT id, latitude, longitude FROM nodes WHERE id in (${nodeList});`;
        //console.log(query);
        const resultQuery = await db.all(query);
        const geoJsonCoordinates = resultQuery.map(n => ({ id: n.id, coordinate: [n.longitude, n.latitude]}));
        const stringOut = JSON.stringify(makeGeoJsonFeature(geoJsonCoordinates),null, 4);
        console.log(stringOut);
    } catch (e) {
        console.log(e);
    }
})();

function makeGeoJsonFeature(point){
    return {
        "type": "FeatureCollection",
        "features": point.map(makePointFeature)
    }
}

function makePointFeature(point){
    return {
        "type": "Feature",
        "properties": {
            "id": point.id,
            "marker-color": "#f50f0f",
            "marker-size": "small"
        },
        "geometry": {
            "type": "Point",
            "coordinates": point.coordinate
        }
    }
}