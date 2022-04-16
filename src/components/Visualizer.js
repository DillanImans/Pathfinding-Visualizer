import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mouseIsPressedAction, gridAction } from './actions';

import HeaderAndKeys from './HeaderAndKeys';
import Grid from './Grid';
import './styling/Visualizer.scss';
import './styling/Init.scss';

class Visualizer extends Component {

  componentDidMount(){
    document.body.className = "bodyStyle";
  }

  handleMouseOut = () => {
    this.props.mouseIsPressedAction("");
  }

  render(){
    return (
      <div className="visualizerCon">
        <div className="hnkVisualizerCon">
          <HeaderAndKeys  />
        </div>
        <div className="gridVisualizerCon" onMouseLeave={this.handleMouseOut}>
          <Grid/>
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

export default connect(mapStateToProps, { mouseIsPressedAction, gridAction })(Visualizer);