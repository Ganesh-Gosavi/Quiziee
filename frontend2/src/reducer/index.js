import { combineReducers } from "@reduxjs/toolkit"; // Import combineReducers from Redux Toolkit

import authReducer from "../slices/authSlice"; // Import the auth reducer
import popupReducer from '../slices/popupSlice'; // Import the popup reducer

// Combine the individual reducers into a single root reducer
const rootReducer = combineReducers({
    auth: authReducer, // Assign the auth reducer to the 'auth' slice of state
    popup: popupReducer // Assign the popup reducer to the 'popup' slice of state
});

// Export the combined root reducer as the default export
export default rootReducer;
