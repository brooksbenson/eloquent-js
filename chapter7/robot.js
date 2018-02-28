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
      ? graph[start] = [end]
      : graph[start].push(end);
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
    } 
    let parcels = this.parcels.map(p => {
      if (this.place != p.place) return p; 
      return {place: destination, address: p.address};
    }).filter(p => p.place != p.address);
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

/*
  Our robot will look at the VillageModel, and will
  decide which way to go. The robot needs to remember
  things so that it can make and execute plans.

  Our robot is actually a function, and on every move,
  it will be passed the VillageModel so it can decide a 
  direction, and it's old memory so it can make better
  decisions.
*/

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

/*
  We could program the robot to make decisions
  completely randomly and eventually all the
  parcels would get delivered, but that would
  be dumb because it will take longer than is
  necessary.
*/


const randomPick = arr => arr[Math.floor(Math.random() * arr.length)];

function randomBot(state) {
  return {direction: randomPick(roadGraph[state.place])};
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

// runRobot(randomBot, VillageState.randomInit());

/*
  To make the robot better at its job, we can
  take a hint from how real-world mail delivery
  systems work.

  If we find a route that passes all places in the
  village, then run that route twice, all
  parcels are guaranteed to be delivered.
*/

const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

/*
  To implement that route following robot, it should
  store the mail route in memory, then drop the first
  item at every move.

  This will run better then the first implementation
  almost always.
*/

function routeRobot(state, memory) {
  if (memory.length === 0) memory = mailRoute;
  return {
    direction: memory[0],
    memory: memory.slice(1)
  }
}

// runRobot(routeRobot, VillageState.randomInit(), mailRoute);

/*
  Next, we are going to implement a path finding robot
  that will diliberately move towards a given parcel or
  towards a parcel address.

  This solution needs to keep creating solutions until
  it finds one that is satisfactory. There is an infinite
  number of possible routes through a graph, but when looking
  for one from A to B, we are only interested in the ones that
  start at A. We also don't care about routes that visit the
  same place twice.

  A good approach given the criteria above would be to "grow"
  a route from the starting point and to explore every reachable
  place that hasn't been visited yet until we reach our goal:
  the shortest route, or one of them.
*/

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

/*
  The findRoute function takes a graph, node a,
  and node b. It returns the first route it
  identifies from point a to point b. To do
  this, it needs to store a list of all nodes
  that are connected to a, then see if any of those
  are b. If not, then it stores the connected
  node in the work list and the route from node a
  to that node. That node becomes part of the
  work load, and its connected nodes are explored
  to see if they are node b, if so, the route
  associated with the current work node is 
  concatenated with node b, and is returned.

  The work list will never contain a node that
  has already been stored in the work list.
*/

function goalOrientedRobot({place, parcels}, route) {
  if (route.length === 0) {
    let parcel = parcels[0];
    route = parcel.place != place
      ? findRoute(roadGraph, place, parcel.place)
      : findRoute(roadGraph, place, parcel.address);
  }
  return {direction: route[0], memory: route.slice(1)};
}

runRobot(goalOrientedRobot, VillageState.randomInit(), []);

/*
  The goal oriented robot first checks to see if
  it has a goal, which is stored in the route
  binding as an array. If not, then it needs
  to figure out what route to travel next.

  If the next parcel from the VillageState
  has not been come across, then the robot
  needs to go pick it up, and it invokes the
  findRoute function with the robot location
  and where the parcel is, and binds the
  return value to the route binding.

  If the next parcel has been stumbled across,
  then it invokes the findRoute function with
  the robots current location and the parcel 
  address and then binds its return value
  to the route binding.

  The route binding is used in the return
  statement to define the next direction
  and the next state of the robots memory.
*/

// Exercises

// Measuring a Robot

/* 
  testRobot tests to see how many steps it takes,
  on average, for a given robot to deliver parcels.

  It does this by running the robot in a randomly
  generated village state n number of times, adding
  the number of steps it takes to a total on each
  iteration, then returns the total steps divided
  by the total iterations, thus providing an average.
*/ 

function testRobot(robot, memory, iterations = 100, state) {
  let totalSteps = 0;
  for (let i = 0; i < iterations; i++) {
    totalSteps += runRobot(state || VillageState.randomInit(), robot, memory);
  }
  return totalSteps / iterations;
}

/*
  The compareRobots function essentially does
  what the testRobot function does, but can
  test more than one robot.
*/

function compareRobots(robots) {
  robots = robots.map(r => {
    r.tot = 0;
    return r;
  });
  for (let i = 0; i < 100; i++) {
    let state = VillageState.randomInit();
    robots.forEach((r, i) => {
      
    })
  }
  return {r1Avg: r1Tot / 100, r2Avg: r2Tot / 100};
}

// Robot Efficiency

function fasterRobot({place, parcels}, route) {
  if (route.length === 0) {
    route = parcels.reduce((route, p) => {
      let pRoute = place == p.place
        ? findRoute(roadGraph, place, p.address)
        : findRoute(roadGraph, place, p.place);
      return route.length < pRoute.length
        ? route
        : pRoute;
    }, []);
  }
  return {destination: route[0], memory: route.slice(0)};
}

console.log(runRobot(fas))