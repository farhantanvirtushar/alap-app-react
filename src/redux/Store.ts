import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./Reducer";

export const createRootStore = () =>{

    return configureStore({
        reducer:rootReducer.reducer
    })
    
}