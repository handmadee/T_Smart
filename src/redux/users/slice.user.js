import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: '',
    fullname: '',
    email: '',
    phone: '',
    avatar: '',
}

const infoSlice = createSlice({
    name: 'infor',
    initialState: {
        infoData: initialState,
    },
    reducers: {
        addInfor: (state, action) => {
            state.infoData = action.payload;
        },
        updateInfor: (state, action) => {
            state.infoData.infor = action.payload;
        }
    },
});

export const infoReducer = infoSlice.reducer;
export const { addInfor, updateInfor } = infoSlice.actions;
export const inforSelector = (state) => state.authReducer.infoData;



