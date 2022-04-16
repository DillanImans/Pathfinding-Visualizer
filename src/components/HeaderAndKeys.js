import React, { Component } from 'react';

import './styling/HeaderAndKeys.scss';
import arrow from '../svgs/arrow-left-solid.svg';
import target from '../svgs/bullseye-solid.svg';

import { connect } from 'react-redux';
import { mouseIsPressedAction, gridAction } from './actions';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra.js';



class HeaderNKeys extends Component {

  visualizeDijkstra = () => {
    const visitedNodesInOrder = dijkstra(this.props.gridState.grid);
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(this.props.gridState.grid[30][7]);
    console.log(nodesInShortestPathOrder);
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
            <button className="vdButton" onClick={this.visualizeDijkstra}>Visualize Dijkstra</button>
          </div>
  
        </div>
  
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { mouseIsPressedState: state.mouseIsPressedState,
           gridState: state.gridState
  }
}

export default connect(mapStateToProps, { mouseIsPressedAction, gridAction })(HeaderNKeys);