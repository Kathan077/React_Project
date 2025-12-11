const arr = [];

export const myReducer = (state = arr, action) => {
  if (action.type === "ADD") {
    const existingIndex = state.findIndex(
      (item) => item.id === action.payload.id
    );

    if (existingIndex >= 0) {
      const updatedState = [...state];
      updatedState[existingIndex].quantity += 1;
      return updatedState;
    } else {
      return [...state, { ...action.payload, quantity: 1 }];
    }
  } 
  else if (action.type === "INC") {
    const newState = [...state];
    newState[action.index].quantity += 1;
    return newState;
  } 
  else if (action.type === "DEC") {
    const newState = [...state];
    if (newState[action.index].quantity > 1) {
      newState[action.index].quantity -= 1;
    }
    return newState;
  } 
  else if (action.type === "DELETE") {
    const newArr = [...state];
    newArr.splice(action.index, 1);
    return newArr;
  }

  return state;
};