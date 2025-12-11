// features/register/register.thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { HOST_NAME } from "@env";
import { SellerType } from "../fetch/fetchUser/fetch.user";
import { CarType } from "../fetch/fetchCar/fetch.car";

                                  
export type RegisterInput = {
    user:SellerType;
    car:CarType;
    image:any
}



export const registerSequenceAction = createAsyncThunk<
    { success: boolean; userId: number; carId: number }, 
    RegisterInput,                                       
    { rejectValue: string }                              
>(
    'register/sequence',
    async (payload, { rejectWithValue }) => {
        const { user, car, image } = payload;
        
        let userId: number;
        let carId: number;

        try {
       
            const userRes = await fetch(`${HOST_NAME}/api/v1/refs/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });

            if (!userRes.ok) throw new Error(`Echec création User (${userRes.status})`);
            
            const userData = await userRes.json();
            userId = userData.id; 

            const carPayload = { ...car, id_seller: userId }; 

            const carRes = await fetch(`${HOST_NAME}/api/v1/refs/cars`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carPayload)
            });

            if (!carRes.ok) throw new Error(`Echec création Car (${carRes.status})`);

            const carData = await carRes.json();
            carId = carData.id;

            const formData = new FormData();
            
    
            formData.append('file', {
                uri: image.uri,
                name: image.fileName,
                type: image.type 
            } as any);
         
            formData.append('carId', String(carId)); 

            const imageRes = await fetch(`${HOST_NAME}/api/v1/refs/cars/${carId}/image`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData
            });

            if (!imageRes.ok) throw new Error(`Echec upload Image (${imageRes.status})`);
            return { success: true, userId, carId };

        } catch (error: any) {
            console.error("Erreur Séquence:", error);
            return rejectWithValue(error.message || "Erreur inconnue");
        }
    }
);