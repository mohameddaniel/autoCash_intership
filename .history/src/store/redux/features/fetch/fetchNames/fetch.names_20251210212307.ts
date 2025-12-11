import { HOST_NAME } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type NamesType = {
   id:number;
   name:string
}

export const fetchNames = createAsyncThunk<
    NamesType[],            
    number,                 
    { rejectValue: string } 
>(
    'name/fetch',
    async (_, { rejectWithValue }) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        try {

            const response = await fetch(`${HOST_NAME}/api/v1/refs/names`, requestOptions);
            if (!response.ok) {
                return rejectWithValue(`Erreur serveur: ${response.status}`);
            }

            const data: NamesType[] = await response.json();
            
            
            return data;
            
        } catch (err) {
            console.error(err);
            return rejectWithValue('Échec de la connexion ou erreur réseau'); 
        }
    }
);