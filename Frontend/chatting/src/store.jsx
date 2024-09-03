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
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    //This should allow you to dispatch functions that return promises
})
export default store;