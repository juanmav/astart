function pathTo(node) {
    let current = node;
    const path = [];
    while (current.parent) {
        path.unshift(current);
        current = current.parent;
    }
    return path;
}

function getLineString(path, color = "#9F5720", width = 3){
    return {
        "type": "Feature",
        "properties": {
            "stroke-width" : width,
            "stroke": color,
            "stroke-opacity": 1
        },
        "geometry": {
            "type": "LineString",
            "coordinates": path.map( n => [n.longitude, n.latitude])
        }
    }
}

function pathToGeoJson(path, alternatives = []){
    let start = nodeToGeoJsonFeaturePoint(path[0], "#f02d61");
    let end = nodeToGeoJsonFeaturePoint(path[path.length-1], "#2df06b");

    return {
        "type": "FeatureCollection",
        "features": [start, end, ...alternatives, getLineString(path, "#2A6EF5",6)]
    }
}

function nodeToGeoJsonFeaturePoint(node, color = "#7e7e7e"){
    return {
        "type": "Feature",
        "properties": {
            "marker-color": color
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                node.longitude,
                node.latitude
            ]
        }
    }
}

function graphToGeoJson(graph){
    return {
        "type": "FeatureCollection",
        "features": graph.map( n => nodeToGeoJsonFeaturePoint(n, n.closed ? "#e927b0":"#42e964"))
    }
}

module.exports = { pathTo, pathToGeoJson, getLineString, nodeToGeoJsonFeaturePoint, graphToGeoJson };