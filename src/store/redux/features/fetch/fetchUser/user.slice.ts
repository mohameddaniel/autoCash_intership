import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserAction, SellerType } from "./fetch.user"; 

type UserSliceType = {
    data: SellerType | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserSliceType = {
     data: null,
     error: null,
     isLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.data = null;
            state.error = null;
            state.isLoading = false;
        }
    },
    
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(fetchUserAction.fulfilled, (state, action: PayloadAction<SellerType>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null;
            })

            .addCase(fetchUserAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || "Erreur lors du chargement du profil";
            });
    }
});

export default userSlice.reducer;