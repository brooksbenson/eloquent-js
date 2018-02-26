/*
  The roads array describes the town of Meadowfield; 
  it consists of 11 places and 14 roads.
*/

const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

/*
  The network of roads forms a graph: a collection
  of nodes (places) with lines connecting them (roads).

  The buildGraph function forms a data structure that
  tells us what nodes you can reach from any other node.
*/

function buildGraph(edges) {
  const graph = Object.create(null);
  const addEdge = (start, end) => {
    graph[start] == null
      ? graph[start] = [to]
      : graph[start].push(to);
  };
  
  for (let [start, end] of edges.map(r => r.split('-'))) {
    addEdge(start, end);
    addEdge(end, start);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

/*
  The nodes on the grid may have parcels; every parcel
  will be addressed to another node. There will be a robot
  that moves along the grid, picking up parcels and dropping
  them off to the nodes they are addressed to.
  
  We are going to model this process by using a class called
  VillageState. It tells us where the robot is and where the
  parcels are. Every time the robot moves, the program is not
  going to mutate the current model, but is going to form a new
  one from the previous one.
*/

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (this.place != p.place) return p; 
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
    }
    return new VillageState(destination, parcels);
  }
}

/*
  When move is called, and the destination value
  is valid, then the parcel state needs to be updated.

  If the parcel.place value corresponds to the current
  node, then it needs to move along with the robot to
  the destination node. If not, then the robot hasn't
  come across it, and therefore it stays where it is.

  If the parcels current location equals the node it is
  addressed to, then it is delivered and should be
  removed from the parcels state.
*/

