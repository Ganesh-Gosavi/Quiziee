import { createSlice } from '@reduxjs/toolkit';

// Initial state for the auth slice
const initialState = {
    // Check if there is a token in localStorage and parse it, otherwise set to null
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem("token")) : null
}

// Create the auth slice using Redux Toolkit's createSlice function
const authSlice = createSlice({
    name: "auth", // Name of the slice
    initialState: initialState, // Initial state of the slice
    reducers: {
        // Reducer to set the token in the state
        setToken(state, value) {
            state.token = value.payload; // Set the token value from the action payload
        }
    }
});

// Export the setToken action creator
export const { setToken } = authSlice.actions;

// Export the reducer as the default export
export default authSlice.reducer;
