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
            userId = userData.id; // ON RÉCUPÈRE L'ID USER ICI

            // =================================================
            // ÉTAPE 2 : Créer la Car (avec ID User)
            // =================================================
            // On injecte l'ID du user dans le body de la voiture
            const carPayload = { ...car, userId: userId }; 

            const carRes = await fetch(`${HOST_NAME}/api/v1/cars`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(carPayload)
            });

            if (!carRes.ok) throw new Error(`Echec création Car (${carRes.status})`);

            const carData = await carRes.json();
            carId = carData.id; // ON RÉCUPÈRE L'ID CAR ICI

            // =================================================
            // ÉTAPE 3 : Upload Image (avec ID Car)
            // =================================================
            const formData = new FormData();
            
            // Configuration spécifique React Native pour l'image
            formData.append('file', {
                uri: image.uri,
                name: image.fileName || 'photo.jpg',
                type: image.type || 'image/jpeg'
            } as any);
            
            // On ajoute l'ID de la voiture pour lier l'image
            formData.append('carId', String(carId)); 

            const imageRes = await fetch(`${HOST_NAME}/api/v1/images/upload`, {
                method: 'POST',
                // NE PAS METTRE 'Content-Type': 'multipart/form-data' !!
                // Laisse le fetch générer le boundary automatiquement
                headers: {
                    'Accept': 'application/json',
                },
                body: formData
            });

            if (!imageRes.ok) throw new Error(`Echec upload Image (${imageRes.status})`);

            // =================================================
            // SUCCÈS TOTAL
            // =================================================
            return { success: true, userId, carId };

        } catch (error: any) {
            console.error("Erreur Séquence:", error);
            // On retourne le message d'erreur spécifique de l'étape qui a échoué
            return rejectWithValue(error.message || "Erreur inconnue");
        }
    }
);