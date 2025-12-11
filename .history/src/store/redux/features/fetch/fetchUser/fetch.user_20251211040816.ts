import { HOST_NAME } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type SellerType = {
    id?: number;
    name_id: number | any;
    seller_type: string | any;
    email: string;
    phone: string;
    city: string;
    address: string;
}

export const fetchUserAction = createAsyncThunk<
    SellerType,              
    number,                  
    { rejectValue: string } 
>(
    'seller/fetch',
    async (user_id, { rejectWithValue }) => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`${HOST_NAME}/api/v1/refs/users?id=${user_id}`, requestOptions);

            if (!response.ok) {
                return rejectWithValue(`Erreur serveur: ${response.status}`);
            }

            const data: SellerType = await response.json();
            
            return data;

        } catch (err) {
            console.error(err);
            return rejectWithValue('Échec de la connexion ou erreur réseau');
        }
    }
);