import React, { Component } from 'react';

import './styling/HeaderAndKeys.scss';
import arrow from '../svgs/arrow-left-solid.svg';
import target from '../svgs/bullseye-solid.svg';
import './styling/Init.scss';

import { connect } from 'react-redux';
import { mouseIsPressedAction, gridAction, afterVisualizeAction } from './actions';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra.js';



class HeaderNKeys extends Component {

  visualizeDijkstra = () => {
    const startNode = this.props.gridState.grid[10][7];
    const targetNode = this.props.gridState.grid[30][7];
    const visitedNodesInOrder = dijkstra(this.props.gridState.grid, startNode, targetNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(this.props.gridState.grid[30][7]);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    document.body.className = 'bodyStyle mouseOff';
    for (let i = 0; i <= visitedNodesInOrder.length; i++){
      if (i === visitedNodesInOrder.length){
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 15 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.col}-${node.row}`).className = "nodeCon node-visited";
      }, 15 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder){
    document.body.className = 'bodyStyle mouseOn';
    this.props.afterVisualizeAction(true);

    for (let i = 0; i < nodesInShortestPathOrder.length; i++){
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.col}-${node.row}`).className = 'nodeCon node-shortest-path';
      }, 50 * i);
    }
  }

  // Only active after visualized.
  refreshSite = () => {
    if(this.props.afterVisualizeState === true){
      window.location.reload();
    }
  }

  render(){
    return (
      <div className="headerAndKeysCon">
  
        <div className="titleCon">
          Pathfinding Visualizer
        </div>
  
        <div className="keysCon">
  
          <div className="keyOuterCon">
            <div className="keyInnerCon">
              <div className="wall" />
              <p>Wall</p>
            </div>
            <div className="keyInnerCon">
              <div className="shortestPath" />
              <p>Shortest Path</p>
            </div>
          </div>
  
          <div className="keyOuterCon">
            <div className="keyInnerCon">
              <img alt="Arrow" src={arrow} className="arrowSvg" />
              <p>Initial Pos</p>
            </div>
            <div className="keyInnerCon">
              <img alt="Target" src={target} />
              <p>Final Pos</p>
            </div>
          </div>
  
          <div className="visualizeButtonCon">
            <button className="vdButton" onClick={() => { this.visualizeDijkstra(); this.refreshSite(); } }>Visualize Dijkstra</button>
          </div>
  
        </div>
  
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { mouseIsPressedState: state.mouseIsPressedState,
           gridState: state.gridState,
           afterVisualizeState: state.afterVisualizeState
  }
}

export default connect(mapStateToProps, { mouseIsPressedAction, gridAction, afterVisualizeAction })(HeaderNKeys);