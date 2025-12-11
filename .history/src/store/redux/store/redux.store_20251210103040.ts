import { configureStore } from "@reduxjs/toolkit";
import  modelReducer  from "../features/fetch/fetchModel/model.slice";
import brandReducer from "../features/fetch/fetchBrand/Brand.slice";
import UserReducer from "../features/fetch/fetchUser/user.slice";
import CarReducer from "../features/fetch/fetchCar/car.slice";

export const store = configureStore({
    reducer:{
        model:modelReducer,
        brand:brandReducer,
        user:UserReducer,
        car:CarReducer,
    }
});

export type RootState = ReturnType<typeof store.getState> ;
export type AppDispatch = typeof store.dispatch ;