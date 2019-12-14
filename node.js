class Node {
    constructor(id, name, latitude, longitude, successors = [], heuristic = this.getCostFromNode){
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.parent = null;
        this.heuristic = heuristic;
        this.successors = successors;
        this.pristine = true;
    }

    setGCost(node){
        this.g = this.getCostFromNode(node) + node.g;
        this.f = this.g + this.h;
        return this.g;
    }

    setHCost(node){
        this.h = this.getHeuristicCost(node);
        this.f = this.g + this.h;
        return this.h;
    }

    getHeuristicCost(node){
        return this.heuristic(node);
    }

    // https://en.wikipedia.org/wiki/Haversine_formula
    getCostFromNode(node){
        const R = 6371000; // Radius of the earth in meters
        const deg2rad = (deg) => deg * (Math.PI/180);

        const lat1 = this.latitude;
        const lon1 = this.longitude;
        const lat2 = node.latitude;
        const lon2= node.longitude;

        const dLat = deg2rad(lat2-lat1);
        const dLon = deg2rad(lon2-lon1);
        const a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; // Distance in meters
    }
}

module.exports = Node;