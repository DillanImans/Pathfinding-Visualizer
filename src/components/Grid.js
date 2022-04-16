import React, { Component } from 'react';

import './styling/Grid.scss';
import Node from './Node.js';
import { connect } from 'react-redux';
import { mouseIsPressedAction, gridAction } from './actions';

class Grid extends Component {
  constructor(){
    super();
    this.state = {
      startnodeCol: 10,
      startnodeRow: 7,
      targetnodeCol: 30,
      targetnodeRow: 7,
    }
  }
  // Start and Target node positions are in state for future user-able-to-position feature.

  componentDidMount(){
    this.createInitialGrid();
  }

  // ALL GRID-BASED FUNCTIONS
  createInitialGrid = () => {
    const grid = [];
    for (let col = 0; col < 40; col++){
      let currentRow = [];
      for (let row = 0; row < 15; row++){
        currentRow.push(this.createNode(col, row));
      }
      grid.push(currentRow);
    }
    this.props.gridAction({grid});
  }

  createNode = (col, row) => {
    return {
      col,
      row,
      isStart: col === this.state.startnodeCol && row === this.state.startnodeRow,
      isTarget: col === this.state.targetnodeCol && row === this.state.targetnodeRow,
      isWall: false,
      isVisited: false,
      previousNode: null,
      distance: Infinity,
    }
  }

  handleMouseDown = (col, row) => {
    if ((col === this.state.startnodeCol && row === this.state.startnodeRow) ||
       (col === this.state.targetnodeCol && row === this.state.targetnodeRow)){
        return;
      } else {
        if (this.props.gridState.grid[col][row].isWall === true){
        this.props.mouseIsPressedAction("deleteWall");
        const grid = this.deleteNewGridWithWalls(this.props.gridState.grid, col, row);
        this.props.gridAction({grid});
      } else {
        this.props.mouseIsPressedAction("createWall");
        const grid = this.getNewGridWithWalls(this.props.gridState.grid, col, row);
        this.props.gridAction({grid});
      }
    }
  }

  handleMouseEnter = (col, row) => {
    if ((col === this.state.startnodeCol && row === this.state.startnodeRow) ||
      (col === this.state.targetnodeCol && row === this.state.targetnodeRow)){

      } else {
        if (this.props.mouseIsPressedState !== ""){
          if (this.props.mouseIsPressedState === "deleteWall"){
            const grid = this.deleteNewGridWithWalls(this.props.gridState.grid, col, row);
            this.props.gridAction({grid});
          } else if (this.props.mouseIsPressedState === "createWall") {
            const grid = this.getNewGridWithWalls(this.props.gridState.grid, col, row);
            this.props.gridAction({grid});
        }
      }
    }
  }

  handleMouseUp = (col, row) => {
    this.props.mouseIsPressedAction("");
  }

  // Update Walls on Down & Enter
  getNewGridWithWalls = (grid, col, row) => {
    const newGrid = grid.slice();
    const targetnode = newGrid[col][row];
    const newnode = {
      ...targetnode,
      isWall: true
    }
    newGrid[col][row] = newnode;
    return newGrid;
  }

  deleteNewGridWithWalls = (grid, col, row) => {
    const newGrid = grid.slice();
    const targetnode = newGrid[col][row];
    const newnode = {
      ...targetnode,
      isWall: false
    }
    newGrid[col][row] = newnode;
    return newGrid;
  }


  handleContextMenu(col, row){
    if ((col === this.state.startnodeCol && row === this.state.startnodeRow) ||
    (col === this.state.targetnodeCol && row === this.state.targetnodeRow)){
      return;
    } else {
      const grid = this.deleteNewGridWithWalls(this.props.gridState.grid, col, row);
      this.props.gridAction({grid});
    }
  }

  // Update Start Pos through Drag (to be continued)
  // getNewGridWithNewStart = (grid, col, row) => {
  // }

  // Update Target Pos through Drag (to be continued)
  // getNewGridWithNewTarget = (grid, col, row) => {
  // }




  // Animate Dijkstra


  // Animate Short Path




  render(){
    const grid = this.props.gridState.grid;
    if(grid === undefined){
      return (
        <div></div>
      )
    } else {
      return (
        <div className="gridCon">
          {grid.map((col, colIdx) => {
            return (
              <div key={colIdx} className="rowCon">
                {col.map((node, nodeIdx) => {
                  const {col, row, isStart, isTarget, isWall} = node;
                  return (
                    <Node
                    col={col}
                    row={row}
                    key={nodeIdx}
                    isStart={isStart}
                    isTarget={isTarget}
                    isWall={isWall}
                    onMouseDown={(col, row) => this.handleMouseDown(col, row)}
                    onMouseEnter={(col, row) => this.handleMouseEnter(col, row)}
                    onMouseUp={(col, row) => this.handleMouseUp(col, row)}
                    onContextMenu={(col, row) => this.handleContextMenu(col, row)}
                    >
                    </Node>
                  )
                })}
              </div>
            )
          })}
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return { mouseIsPressedState: state.mouseIsPressedState,
           gridState: state.gridState
  }
}

export default connect(mapStateToProps, { mouseIsPressedAction, gridAction })(Grid);