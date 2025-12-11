import { HOST_NAME } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type MonthsType = {
   id:number;
   month:number
}

export const fetchMonths = createAsyncThunk<
    MonthsType[],            
    number,                 
    { rejectValue: string } 
>(
    'month/fetch',
    async (id, { rejectWithValue }) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        try {

            const response = await fetch(`${HOST_NAME}/api/v1/refs/months?id=${id}`, requestOptions);
            if (!response.ok) {
                return rejectWithValue(`Erreur serveur: ${response.status}`);
            }

            const data: MonthsType[] = await response.json();
            
            
            return data;
            
        } catch (err) {
            console.error(err);
            return rejectWithValue('Échec de la connexion ou erreur réseau'); 
        }
    }
);