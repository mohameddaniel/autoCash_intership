import { HOST_NAME } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type  CarType =  {
  car_id: number;
  car_month: number;
  car_price: number;
  car_year: number;
  city: string;
  id_brand: number;
  id_model: number;
  id_seller: number;
  mile_age: number;
}


export const fetchCarsAction = createAsyncThunk<
    CarType[],
    void,
    { rejectValue: string }
>(
    'cars/fetch',
    async (_, { rejectWithValue }) => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        try {
            const response = await fetch(`${HOST_NAME}/api/v1/refs/cars`, requestOptions);

            if (!response.ok) {
                return rejectWithValue(`Erreur serveur: ${response.status}`);
            }

            const data: CarType[] = await response.json();
            
            return data;

        } catch (err) {
            console.error("Erreur fetchCars:", err);
            return rejectWithValue('Échec de la connexion ou erreur réseau');
        }
    }
);