import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    id: '',
    accesstoken: '',
    refreshtoken: '',
    infor: {
        _id: '',
        fullname: '',
        email: '',
        phone: '',
        avatar: '',
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authData: initialState,
    },
    reducers: {
        addAuth: (state, action) => {
            state.authData = action.payload;
        },

        removeAuth: (state, action) => {
            state.authData = initialState;
        },
        updateInfor: (state, action) => {
            state.authData.infor = action.payload;
        }
    },
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth, updateInfor } = authSlice.actions;
export const authSelector = (state) => state.authReducer.authData;