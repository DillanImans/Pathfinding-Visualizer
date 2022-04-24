export function dijkstra(grid, startNode, targetNode){
  const unvisitedNodes = getAllNodes(grid);
  const visitedNodesInOrder = [];

  // Set Start node to 0. All other nodes will be infinity.
  startNode.distance = 0;

  while(!!unvisitedNodes.length){
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    // Wall Skip
    if (closestNode.isWall) continue;

    // Wall trap. If no opening path to go, then stop dijkstra.
    if (closestNode.distance === Infinity) {
      return visitedNodesInOrder;
    }


    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    // A.K.A if target is reached, then stop dijkstra.
    if (closestNode === targetNode){
      return visitedNodesInOrder;
    }

    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function getAllNodes(grid){
  const nodes = [];
  grid.forEach(row => {
    row.forEach(nodeInRow => {
      nodes.push(nodeInRow);
    })
  })
  return nodes;
}


/* All unvisited neighbors of the current node will be given a distance of +1 from the previous node. 
This will be how dijkstra measures the shortest distance. */
function updateUnvisitedNeighbors(currentNode, grid){
  const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
  for (const neighbor of unvisitedNeighbors){
    neighbor.distance = currentNode.distance + 1;
    neighbor.previousNode = currentNode;
  }
}


// Basically North, East, South, West of the current node (which would be the neighbors).
function getUnvisitedNeighbors(currentNode, grid){
  const neighbors = [];
  const {col, row} = currentNode;
  if (row > 0) neighbors.push(grid[col][row - 1]);
  if (row < 14) neighbors.push(grid[col][row + 1]);
  if (col > 0) neighbors.push(grid[col - 1][row]);
  if (col < 39) neighbors.push(grid[col + 1][row]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}


/* A Fibonacci Heap provides the lowest running time. Though for now, a simple sort will have to do.
This is to keep on sorting all nodes from lowest to highest distance. */
function sortNodesByDistance(unvisitedNodes){
  unvisitedNodes.sort((nodeU, nodeV) => nodeU.distance - nodeV.distance);
}


/* Track back from target node to starting node with the lowest distance.
How it knows the lowest distance is from the previous node of targetNode, where
all of the nodes are already sorted from shortest-longest, hence the previousNode of targetNode
and the previousNode of previousNode (so on and on) will always be the lower amount of distance*/
// FOR EXAMPLE: [start, 1, 2 , 3, 4, 5, 6, targetNode, 7, 8]; It will track back to the previous item in the arr.
export function getNodesInShortestPathOrder(targetNode){
  const nodesInShortestPathOrder = [];
  let currentNodeInPath = targetNode;
  while (currentNodeInPath !== null){
    nodesInShortestPathOrder.unshift(currentNodeInPath);
    currentNodeInPath = currentNodeInPath.previousNode;
  }
  return nodesInShortestPathOrder;
}