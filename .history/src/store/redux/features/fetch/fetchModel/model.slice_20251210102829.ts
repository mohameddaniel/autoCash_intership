    import { createSlice, PayloadAction } from "@reduxjs/toolkit";
    import { fetchModel,ModelType } from "./fetch.model";

    type ModelStateType = {
        models:ModelType[],
        isLoading:boolean,
        error:string | null;
    }
    const initialState:ModelStateType = {
    models:[],
    isLoading:false,
    error:null
    }

    export const modelSlice = createSlice({
        name:'model',
        initialState,
        reducers:{

        },
        extraReducers:(builder) => {
            builder
            .addCase(fetchModel.pending,(state) => {
                state.isLoading = true,
                state.error = null;
            })

            .addCase(fetchModel.fulfilled,(state,action:PayloadAction<ModelType[]>) => {
                state.isLoading = false;
                state.models = action.payload as any;
                state.error = null

            })

            .addCase(fetchModel.rejected,(state,action) => {
                state.isLoading = false;
                state.error = action.payload as string
            })
        }
    })


    export default modelSlice.reducer