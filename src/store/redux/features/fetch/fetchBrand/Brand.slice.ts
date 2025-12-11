import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { BrandType,fetchBrandAction } from "./Brand.fetch";


export interface BrandSliceType {
    brands:BrandType[],
    isLoading:boolean,
    error:string  | null
} 

const initialState:BrandSliceType = {
    brands:[],
    isLoading:false,
    error:null
}

const brandSlice = createSlice({
    name:'brand',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(fetchBrandAction.pending,(state) => {
            state.isLoading = false;
            state.error = null
        })

        .addCase(fetchBrandAction.fulfilled,(state,action:PayloadAction<BrandType[]>)=>{
            state.brands = action.payload;
            state.error = null;
            state.isLoading = false
        })

        .addCase(fetchBrandAction.rejected,(state,action) =>{
            state.error = action.payload as string;
            state.isLoading = false;
        } )
    }
})


export default brandSlice.reducer