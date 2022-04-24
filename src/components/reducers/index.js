import { combineReducers } from 'redux';

const mouseIsPressedReducer = (state = "", action) => {
  if (action.type === "MOUSE_PRESSED"){
    state = action.payload;
  }

  return state;
}

const gridReducer = (state = [], action) => {
  if (action.type === "GRID"){
    state = action.payload;
  }

  return state;
}

const afterVisualizeReducer = (state = false, action) => {
  if (action.type === "AFTER_VISUALIZE"){
    state = action.payload;
  }

  return state;
}

const comRed = combineReducers({
  mouseIsPressedState: mouseIsPressedReducer,
  gridState: gridReducer,
  afterVisualizeState: afterVisualizeReducer
})

export default comRed;