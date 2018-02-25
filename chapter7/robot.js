/*
  The village of Meadowfield consists of eleven places
  with fourteen roads between them. 
  
  The roads binding holds an array that lists 14 roads, 
  each of which contains data that represents two places, 
  separated by a hyphen. 
  
  Each of these values represents a line that can be traveled
  by our automaton between two places.
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
  The network of roads in the village forms a graph:
  a collection of points (places in the village) with
  lines between them (roads). This graph represents
  the virtual world our robot will move through.

  The roads array isn't very easy to work with; instead,
  we are going to build a data structure that represents
  our graph. It is going to tell us the places that we
  can reach from any other place.
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
  The robot will be moving around the village. There
  will be parcels in various places, each addressed to
  some other place. The robot picks up parcels when it
  comes to them, and deliveres them when it arrives at
  their destination.

  The automaton must decide, at each point, where to go
  next. It has finished its duty once all parcels have 
  been delivered.
*/

/*
  To simulate this process, we must define a virtual world
  that can describe it. This model tells us where the robot
  is and where the parcels are. When the robot has decided
  to move, we need to update the model.
*/

/*
  To use objects to describe every concept in our virtual
  world would in fact be wrong, or it may be. The fact that
  something sounds like an object doesn't mean that it should
  automatically be represented by one.

  Reflexively writing classes for every concept in an application
  may end up with messy code: a whole bunch of interconnected objects 
  managing their own internal state. Marijn describes these kinds of
  programs as being hard to understand and, therefore, easy to break.
*/

/*
  The village state is going to be represented with a minimal set
  of values. There's the robots current location, the collection
  of undeliverd parcels, and that's it.

  The program is not going to change the original state when it
  changes, but is going to compute a new state based on the old
  one.
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
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
    }
    return new VillageState(destination, parcels);
  }
}