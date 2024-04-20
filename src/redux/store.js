import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './token/slice.token';


const store = configureStore({
    reducer: {
        authReducer,
    },
});
export default store;