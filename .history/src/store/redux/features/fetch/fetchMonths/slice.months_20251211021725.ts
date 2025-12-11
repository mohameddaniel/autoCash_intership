    import { createSlice, PayloadAction } from "@reduxjs/toolkit";
    import { fetchMonths,MonthsType } from "./fetch.months";

    type ModelStateType = {
        names:MonthsType[],
        isLoading:boolean,
        error:string | null;
    }
    const initialState:ModelStateType = {
    month:[],
    isLoading:false,
    error:null
    }

    export const monthSlice = createSlice({
        name:'month',
        initialState,
        reducers:{

        },
        extraReducers:(builder) => {
            builder
            .addCase(fetchMonths.pending,(state) => {
                state.isLoading = true,
                state.error = null;
            })

            .addCase(fetchMonths.fulfilled,(state,action:PayloadAction<MonthsType[]>) => {
                state.isLoading = false;
                state.names = action.payload as any;
                state.error = null

            })

            .addCase(fetchMonths.rejected,(state,action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
        }
    })


    export default nameSlice.reducer