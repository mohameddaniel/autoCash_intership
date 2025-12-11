import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCarsAction,CarType } from "./fetch.car";

type CarSliceType = {
    cars: CarType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: CarSliceType = {
     cars: [],
     error: null,
     isLoading: false
}

export const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.cars = [];
            state.error = null;
            state.isLoading = false;
        }
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarsAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(fetchCarsAction.fulfilled, (state, action: PayloadAction<CarType[]>) => {
                state.isLoading = false;
                state.cars = action.payload;
                state.error = null;
            })

            .addCase(fetchCarsAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || "Erreur lors du chargement du profil";
            });
    }
});

export default carSlice.reducer;