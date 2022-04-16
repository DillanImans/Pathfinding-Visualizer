import React, { Component } from 'react';

import './styling/Node.scss';
import arrowTing from '../svgs/arrow-left-solid.svg';
import targetTing from '../svgs/bullseye-solid.svg';

class Node extends Component {
  render(){
    const {
      col,
      row,
      isStart,
      isTarget,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      onContextMenu
    } = this.props;

    const toggleSvg =
    isStart ? arrowTing :
    isTarget ? targetTing : ""

    const toggleWall =
    isWall ? "wallTing" : "";
    
    return (
      <div 
      className={`nodeCon ${toggleWall}`}
      onMouseDown={() => onMouseDown(col, row)}
      onMouseEnter={() => onMouseEnter(col, row)}
      onMouseUp={() => onMouseUp(col, row)}
      onContextMenu={() => onContextMenu(col, row)}
      >
        { isStart || isTarget ? <img className="svgTing" src={toggleSvg} alt="Svg"></img> : ""}
      </div>
    )
  }
}

export default Node;