// features/register/register.slice.ts
import { createSlice } from "@reduxjs/toolkit";
import { registerSequenceAction } from "./car.save.infos";

interface RegisterState {
    isLoading: boolean;
    error: string | null;
    success: boolean;
    stepCompleted: number; 
}

const initialState: RegisterState = {
    isLoading: false,
    error: null,
    success: false,
    stepCompleted: 0
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        resetRegister: (state) => {
            state.isLoading = false;
            state.error = null;
            state.success = false;
            state.stepCompleted = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerSequenceAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerSequenceAction.fulfilled, (state) => {
                state.isLoading = false;
                state.success = true;
                state.stepCompleted = 3; // Tout est fini
            })
            .addCase(registerSequenceAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    }
});

export const { resetRegister } = registerSlice.actions;
export default registerSlice.reducer;