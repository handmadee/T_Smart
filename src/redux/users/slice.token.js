import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    avatar: '',
    fullName: '',
    email: '',
    phone: '',
    birthDays: '',
    grader: ''
}

const userSlice = createSlice({
    name: 'inforUser',
    initialState: {
        infoData: initialState,
    },
    reducers: {
        addInfo: (state, action) => {
            state.infoData = action.payload;
        },
        editInfo: (state, action) => {
            state.infoData = {
                ...state.infoData,
                ...action.payload
            }
        }

    },
});

// eXPORT 
