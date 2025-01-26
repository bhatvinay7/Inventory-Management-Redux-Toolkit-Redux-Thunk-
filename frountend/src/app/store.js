import { configureStore } from "@reduxjs/toolkit";
import  itemSlice  from "./features/inventory/itemSlice.js";
export const store = configureStore({
    reducer: {
        Items: itemSlice,
        
    }
})