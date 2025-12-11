    import { createSlice, PayloadAction } from "@reduxjs/toolkit";
    import { fetchYears,YearsType } from "./fetch.years";

    type ModelStateType = {
        years:YearsType[],
        isLoading:boolean,
        error:string | null;
    }
    const initialState:ModelStateType = {
    years:[],
    isLoading:false,
    error:null
    }

    export const yearsSlice = createSlice({
        name:'year',
        initialState,
        reducers:{

        },
        extraReducers:(builder) => {
            builder
            .addCase(fetchYears.pending,(state) => {
                state.isLoading = true,
                state.error = null;
            })

            .addCase(fetchYears.fulfilled,(state,action:PayloadAction<YearsType[]>) => {
                state.isLoading = false;
                state.years = action.payload as any;
                state.error = null

            })

            .addCase(fetchYears.rejected,(state,action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
        }
    })


    export default yearsSlice.reducer