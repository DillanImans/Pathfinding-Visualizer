// To check if mouse is off the grid, which then makes the state "mouseIsPressed" to false.
export const mouseIsPressedAction = (ref) => {
  return {
    type: "MOUSE_PRESSED",
    payload: ref
  }
}

// Both "Grid.js" and "HeaderAndKeys.js" need the grid state.
export const gridAction = (grid) => {
  return {
    type: "GRID",
    payload: grid
  }
}