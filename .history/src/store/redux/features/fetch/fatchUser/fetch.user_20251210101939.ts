import { HOST_NAME } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type SellerType =  {
  id: number;
  sellerName: string;
  sellerType: string;
  email: string;
  phone: string;
  city: string;
  address: string;
}


export const fetchUserAction = createAsyncThunk<
    SellerType,
    number,
    {rejectValue:string}
>(
    'seller/fetch',
    async(user_id,{rejectWithValue}) => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type','application/json')

        const requestOptions = {
            method:'GET',
            headers:myHeaders,
            redirect:'follow',
        }

        try{
            const resposne = await fetch(`${HOST_NAME}/api/v1/refs/users?id=${user_id}`,requestOptions)
            if(!resposne.ok){
                rejectWithValue('something')
            }

            const data:SellerType = await resposne.json();
            return data
        }catch(err){
            rejectWithValue('something')
        }
    }
)
