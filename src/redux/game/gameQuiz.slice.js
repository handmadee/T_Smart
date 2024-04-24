import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    Scorce: 0,
    worldRank: 0,
    localRank: 0,
    totalQuestion: 0,
    totalWin: 0,
}

const gameSlice = createSlice({
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
