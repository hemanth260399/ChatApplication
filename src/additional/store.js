import { configureStore } from "@reduxjs/toolkit";
import { ReduxData } from "./reducer";

export const store = configureStore({
    reducer: { ReduxData },
    devTools: true
})