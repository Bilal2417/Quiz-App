import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { quizSlice } from "./quizSlice";

const mainReducer = combineReducers({
    quizSlice: quizSlice.reducer
});

export const mainStore = configureStore({
    reducer: mainReducer
});

