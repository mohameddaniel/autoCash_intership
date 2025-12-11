import { HOST_NAME } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type ModelType = {
    model_id?: number;
    model_name: string;
}

export const fetchModel = createAsyncThunk<
    ModelType[],            
    number,                 
    { rejectValue: string } 
>(
    'model/fetch',
    async (id_brand, { rejectWithValue }) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        try {

            const response = await fetch(`${HOST_NAME}/api/v1/refs/models?id=${id_brand}`, requestOptions);
            if (!response.ok) {
                return rejectWithValue(`Erreur serveur: ${response.status}`);
            }

            const data: ModelType[] = await response.json();
            
            
            return data;
            
        } catch (err) {
            console.error(err);
            return rejectWithValue('Échec de la connexion ou erreur réseau'); 
        }
    }
);