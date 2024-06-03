import { createSlice } from '@reduxjs/toolkit';

// Initial state for the popup slice
const initialState = {
    deletePopup: false, // State to manage visibility of delete popup
    createPopup: false,  // State to manage visibility of create popup
    editPopup:false    //State to manage visibility of edit popup
}

// Create the popup slice using Redux Toolkit's createSlice function
const popupSlice = createSlice({
    name: "popup", // Name of the slice
    initialState: initialState, // Initial state of the slice
    reducers: {
        // Reducer to set the visibility of the delete popup
        setDeletePopup(state, value) {
            state.deletePopup = value.payload; // Set deletePopup state based on the action payload
        },
        // Reducer to set the visibility of the create popup
        setCreatePopup(state, value) {
            state.createPopup = value.payload; // Set createPopup state based on the action payload
        },
        // Reducer to set the visibility of the edit popup
        setEditPopup(state,value){
            state.editPopup = value.payload;
        }
    }
});

// Export the action creators for setting the popup states
export const { setDeletePopup, setCreatePopup ,setEditPopup} = popupSlice.actions;

// Export the reducer as the default export
export default popupSlice.reducer;
