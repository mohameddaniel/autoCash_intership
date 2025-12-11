import { HOST_NAME } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type BrandType =  {
  brand_id: number;
  brand_name: string;
}

export const fetchBrandAction = createAsyncThunk<
    BrandType[],
    void,
    {rejectValue:string}
    >(
        'brand/fetch',
        async (_, {rejectWithValue}) => {
            const myHeaders = new Headers()
            myHeaders.append("Content-Type","application/json")

            const requestOptions = {
                method:'GET',
                headers:myHeaders,
                redirect:'follow'
            }

            try{

                const response  = await fetch(`${HOST_NAME}/api/v1/refs/brands`,requestOptions)
                if(response.ok){
                    rejectWithValue("erreur interne de serveur")
                }

                const data  = await  response.json()

                return data;

            }catch(err){

            }
        }
    )