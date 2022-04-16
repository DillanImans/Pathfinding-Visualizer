export function dijkstra(grid){
  const unvisitedNodes = getAllNodes(grid);
  const visitedNodesInOrder = [];

  // Hard coded, for now.
  const startNode = grid[10][7];
  const targetNode = grid[30][7];

  startNode.distance = 0;

  while(!!unvisitedNodes.length){
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();

    // Wall Skip
    if (closestNode.isWall) continue;

    // Wall trap
    if (closestNode.distance === Infinity) {
      return visitedNodesInOrder;
    }


    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

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

function updateUnvisitedNeighbors(currentNode, grid){
  const unvisitedNeighbor = getUnvisitedNeighbors(currentNode, grid);
  for (const neighbor of unvisitedNeighbor){
    neighbor.distance = currentNode.distance + 1;
    neighbor.previousNode = currentNode;
  }
}

function getUnvisitedNeighbors(currentNode, grid){
  const neighbors = [];
  const {col, row} = currentNode;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => checkIsVisited(neighbor));
}

function checkIsVisited(neighbor){
  if (neighbor.isVisited === false){
    return neighbor;
  }
}

// A Fibonacci Heap provides the lowest running time. Though for now, a simple sort will have to do.
function sortNodesByDistance(unvisitedNodes){
  unvisitedNodes.sort((nodeU, nodeV) => nodeU.distance - nodeV.distance);
}

export function getNodesInShortestPathOrder(targetNode){
  const nodesInShortestPathOrder = [];
  let currentNodeInPath = targetNode;
  while (currentNodeInPath !== null){
    nodesInShortestPathOrder.unshift(currentNodeInPath);
    currentNodeInPath = currentNodeInPath.previousNode;
  }
  return nodesInShortestPathOrder;
}