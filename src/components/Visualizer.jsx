import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mouseIsPressedAction, gridAction, afterVisualizeAction } from './actions';

import HeaderAndKeys from './HeaderAndKeys';
import Grid from './Grid.jsx';
import './styling/Visualizer.scss';
import './styling/Init.scss';

class Visualizer extends Component {

  componentDidMount(){
    document.body.className = "bodyStyle";
  }

  handleMouseOut = () => {
    this.props.mouseIsPressedAction("");
  }

  // Only active after visualized.
  refreshSite = () => {
    if(this.props.afterVisualizeState === true){
      window.location.reload();
    }
  }

  render(){
    return (
      <div className="visualizerCon">
        <div className="hnkVisualizerCon">
          <HeaderAndKeys  />
        </div>
        <div className="gridVisualizerCon" onMouseLeave={this.handleMouseOut} onMouseDown={this.refreshSite}>
          <Grid />
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

export default connect(mapStateToProps, { mouseIsPressedAction, gridAction, afterVisualizeAction })(Visualizer);