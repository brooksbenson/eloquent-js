const utils = function() {
  const randomPick = arr => arr[Math.floor(Math.random() * arr.length)];

  function findRoute(graph, a, b) {
    let work = [{at: a, route: []}];
    for (let i = 0; i < work.length; i++) {
      let {at, route} = work[i];
      for (let place of graph[at]) {
        if (place == b) return route.concat(place);
        if (!work.some(w => w.at == place)) {
          work.push({at: place, route: route.concat(place)});
        }
      }
    }
  }

  function buildGraph(edges) {
    const graph = Object.create(null);
    const addEdge = (start, end) => {
      graph[start] == null
        ? graph[start] = [end]
        : graph[start].push(end);
    };
    
    for (let [start, end] of edges.map(r => r.split('-'))) {
      addEdge(start, end);
      addEdge(end, start);
    }
    return graph;
  }
  
  return {randomPick, findRoute, buildGraph};
}();

const data = function() {
  const {buildGraph} = utils;

  const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];

  const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
  ];

  return {mailRoute, roadGraph: buildGraph(roads)};
}();

const simulator = function() {
  const {randomPick} = utils;
  const {roadGraph} = data;

  class VillageState {
    constructor(place, parcels) {
      this.place = place;
      this.parcels = parcels;
    }

    move(destination) {
      if (!roadGraph[this.place].includes(destination)) {
        return this;
      } 
      let parcels = this.parcels.map(p => {
        if (this.place != p.place) return p; 
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }

  VillageState.randomInit = function(parcelCount = 5) {
    let parcels = [], places = Object.keys(roadGraph);
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(places);
      let place;
      do {
        place = randomPick(places);
      } while (place == address);
      parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
  };
 
  function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
      if (state.parcels.length === 0) {
        return turn;
      }

      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
    }
  }

  return {VillageState, runRobot};
}();

const robots = function() {
  const {randomPick, findRoute} = utils;
  const {roadGraph} = data;

  function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
  }

  function routeRobot(state, memory) {
    if (memory.length === 0) memory = mailRoute;
    return {
      direction: memory[0],
      memory: memory.slice(1)
    }
  }

  function goalOrientedRobot({place, parcels}, route) {
    if (route.length === 0) {
      let parcel = parcels[0];
      route = parcel.place != place
        ? findRoute(roadGraph, place, parcel.place)
        : findRoute(roadGraph, place, parcel.address);
    }
    return {direction: route[0], memory: route.slice(1)};
  }

  function customRobot({place, parcels}, route) {
    if (route.length === 0) {
      let routes = parcels.map(p => (
        p.place == place
          ? findRoute(roadGraph, place, p.address)
          : findRoute(roadGraph, place, p.place)
      ));
      route = routes.reduce((shortest, current) => (
        shortest.length < current.length
          ? shortest
          : current
      ));
    }
    return {direction: route[0], memory: route.slice(1)};
  }

  return {randomRobot, customRobot, goalOrientedRobot, customRobot};
}();

const testing = function() {
  const {VillageState, runRobot} = simulator;

  function testRobot(robot, memory, iterations = 100, state) {
    let totalTurns = 0;
    for (let i = 0; i < iterations; i++) {
      totalTurns += runRobot(VillageState.randomInit(), robot, memory);
    }
    return totalTurns / iterations;
  }

  const compareRobots = (r1, m1, r2, m2) => ({
    "Robot 1 average": testRobot(r1, m1),
    "Robot 2 average": testRobot(r2, m2)
  });

  return {testRobot, compareRobots};
}();

// Sample program

const {testRobot, compareRobots} = testing;
const {goalOrientedRobot, customRobot} = robots;
console.log(compareRobots(customRobot, [], goalOrientedRobot, []));