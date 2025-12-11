import { HOST_NAME } from "@env";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type  CarType =  {
  car_id?: number;
  car_price: number;
  city: string;
  id_brand: number;
  id_model: number;
  id_seller?: number;
  mile_age: number;
  yearId:number;
  monthId:number;
}

export type CarResponse = {
    id:number;
    SellerName:string;
    brands:string;
    createAt:Date;
    imageUrl:string;
    model:string;
    ville:string;
}


export const fetchCarsAction = createAsyncThunk<
    CarResponse[],
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

            const data: CarResponse[] = await response.json();
            
            return data;

        } catch (err) {
            console.error("Erreur fetchCars:", err);
            return rejectWithValue('Échec de la connexion ou erreur réseau');
        }
    }
);