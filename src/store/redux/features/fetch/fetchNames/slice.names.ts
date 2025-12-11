    import { createSlice, PayloadAction } from "@reduxjs/toolkit";
    import { fetchNames,NamesType } from "./fetch.names";

    type ModelStateType = {
        names:NamesType[],
        isLoading:boolean,
        error:string | null;
    }
    const initialState:ModelStateType = {
    names:[],
    isLoading:false,
    error:null
    }

    export const nameSlice = createSlice({
        name:'name',
        initialState,
        reducers:{

        },
        extraReducers:(builder) => {
            builder
            .addCase(fetchNames.pending,(state) => {
                state.isLoading = true,
                state.error = null;
            })

            .addCase(fetchNames.fulfilled,(state,action:PayloadAction<NamesType[]>) => {
                state.isLoading = false;
                state.names = action.payload as any;
                state.error = null

            })

            .addCase(fetchNames.rejected,(state,action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
        }
    })


    export default nameSlice.reducer