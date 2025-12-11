import { configureStore } from "@reduxjs/toolkit";
import modelReducer from "../features/fetch/fetchModel/model.slice";
import brandReducer from "../features/fetch/fetchBrand/Brand.slice";
import UserReducer from "../features/fetch/fetchUser/user.slice";
import CarReducer from "../features/fetch/fetchCar/car.slice";
import registerSlice from "../features/car/car.save.slice";

export const store = configureStore({
    reducer:{
        model:modelReducer,
        brand:brandReducer,
        user:UserReducer,
        car:CarReducer,
        register:registerSlice
    }
});

export type RootState = ReturnType<typeof store.getState> ;
export type AppDispatch = typeof store.dispatch ;