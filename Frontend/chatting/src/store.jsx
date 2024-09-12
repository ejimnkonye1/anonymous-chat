import { configureStore } from "@reduxjs/toolkit";
const initialState =  {
    username: null
}
const reducer = ( state = initialState, action) => {
switch (action.type) {
  case "SET_USER":
    return {
  ...state,
  username: action.payload
}
    default:
        return state;
        
}

}
const store = configureStore({
    reducer,

})
export default store;