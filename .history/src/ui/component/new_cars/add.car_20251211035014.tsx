import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Upload } from 'lucide-react-native';
import { pick, types, DocumentPickerResponse } from '@react-native-documents/picker';

// --- IMPORTS ---
import { COLORS, STATUS } from '../../utils/color.ui';
import { fonts } from '../../utils/fonts';
import ProPriceInput from '../../custom/input.price'; 
import ProTextInput from '../../custom/input.text';   
import SmartCombobox from '../../custom/comboBox.component';
import PhoneInput from '../../custom/phone.input';
import LoadingCycle from '../../custom/loading.cycle';

// --- DATA & REDUX ---
import { SellerTypeData } from '../../../store/data/siller.type';
import { cities } from '../../../store/data/cities.maorc';
import { useAppDispatch, useAppSelector } from '../../../store/redux/store/redux.hooks';
import { fetchNames } from '../../../store/redux/features/fetch/fetchNames/fetch.names';
import { fetchBrandAction } from '../../../store/redux/features/fetch/fetchBrand/Brand.fetch';
import { fetchMonths } from '../../../store/redux/features/fetch/fetchMonths/fetch.months';
import { fetchYears } from '../../../store/redux/features/fetch/fetchYears/fetch.years';
import { fetchModel } from '../../../store/redux/features/fetch/fetchModel/fetch.model';
import { registerSequenceAction } from '../../../store/redux/features/car/car.save.infos';
import { transBrnads, transModels, transMonths, transYears } from '../../utils/transforms.data';

const AddCarScreen = () => {
  const dispatch = useAppDispatch();

  // --- SELECTORS ---
  const { isLoading: loadingNames, names } = useAppSelector((state) => state.name);
  const { isLoading: loadingBrand, brands } = useAppSelector((state) => state.brand);
  const { isLoading: loadingMonth, months } = useAppSelector((state) => state.month);
  const { isLoading: loadingYear, years } = useAppSelector((state) => state.year);
  const { isLoading: loadingModel, models } = useAppSelector((state) => state.model);
  
  // État global de chargement (si l'un d'eux charge, on bloque)
  const isGlobalLoading = loadingNames || loadingBrand || loadingMonth || loadingYear || loadingModel;

  // --- LOCAL STATE ---
  const [price, setPrice] = useState<number | null>(null);
  const [picture, setPicture] = useState<DocumentPickerResponse | null>(null);
  
  // Vendeur
  const [sellerTypeId, setSellerTypeId] = useState<string | number | undefined>(); 
  const [sellerNameId, setSellerNameId] = useState<string | number | undefined>();
  const [phoneDisplay, setPhoneDisplay] = useState('');
  const [phoneRaw, setPhoneRaw] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  // Voiture
  const [marqueId, setMarqueId] = useState<string | number | undefined>();
  const [modelId, setModelId] = useState<string | number | undefined>();
  const [yearId, setYearId] = useState<string | number | undefined>();
  const [monthId, setMonthId] = useState<string | number | undefined>();
  const [km, setKm] = useState<string>(''); // KM géré en string pour l'input, converti à l'envoi

  // Erreurs de validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- EFFECTS ---

  // 1. Chargement initial
  useEffect(() => {
    dispatch(fetchNames());
    dispatch(fetchBrandAction());
  }, [dispatch]);

  // 2. Cascade Marque -> Modèle (Reset du modèle si la marque change)
  useEffect(() => {
    if (marqueId) {
      dispatch(fetchModel(marqueId as number));
      setModelId(undefined); // PRO TIP: Reset le modèle si la marque change
    }
  }, [marqueId, dispatch]);
   
  // 3. Cascade Modèle -> Années/Mois
  useEffect(() => {
    if (modelId) {
      dispatch(fetchMonths(modelId as number));
      dispatch(fetchYears(modelId as number));
      setYearId(undefined); // Reset année
      setMonthId(undefined); // Reset mois
    }
  }, [modelId, dispatch]);


  // --- HANDLERS ---

  const handlePickImage = async () => {
    try {
      const [result] = await pick({
        type: [types.images],
        mode: 'import',
        allowMultiSelection: false,
      });
      setPicture(result);
      // Effacer l'erreur si l'image est choisie
      setErrors(prev => ({...prev, picture: ''})); 
    } catch (err: any) {
      if (!err.code?.includes('CANCELED')) console.error(err);
    }
  };

  // Fonction de validation
  const validateForm = (): boolean => {
    let tempErrors: Record<string, string> = {};
    let isValid = true;

    if (!price) tempErrors.price = "Le prix est requis";
    if (!sellerTypeId) tempErrors.sellerType = "Type requis";
    if (!sellerNameId) tempErrors.sellerName = "Nom requis";
    if (!phoneRaw) tempErrors.phone = "Téléphone requis";
    if (!marqueId) tempErrors.marque = "Marque requise";
    if (!modelId) tempErrors.model = "Modèle requis";
    if (!yearId) tempErrors.year = "Année requise";
    if (!picture) tempErrors.picture = "Photo requise";
    if(!email) tempErrors.email = "Email est requise"
    if(!city)  tempErrors.city = "la ville est requise";
    if(!address)  tempErrors.address = "l'adress est requise"
    if(!monthId)  tempErrors.monthId = "le mois est requise"
    if(!km)  tempErrors.km = "kelimétrage est requise"

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      isValid = false;
      Alert.alert("Formulaire incomplet", "Veuillez remplir tous les champs obligatoires.");
    } else {
        setErrors({});
    }
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Construction de l'objet DTO (Data Transfer Object) propre
    const carDataPayload = {
        price,
        sellerInfo: {
            typeId: sellerTypeId,
            nameId: sellerNameId,
            phone: phoneRaw,
            email,
            city,
            address
        },
        carInfo: {
            brandId: marqueId,
            modelId: modelId,
            yearId: yearId,
            monthId: monthId,
            mileage: km ? parseInt(km.replace(/\s/g, '')) : 0, // Nettoyage espaces
            picture: picture
        }
    };

    console.log("Envoi des données:", carDataPayload);
    // dispatch(registerSequenceAction(carDataPayload));
  };


  // --- RENDER ---
  
  return (
    <SafeAreaView style={styles.container}>
      <LoadingCycle isLoadingCycle={isGlobalLoading}/>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={{ flex: 1 }}
      >
        <ScrollView 
            showsVerticalScrollIndicator={false} 
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 40 }}
        >
            
            {/* --- PRIX --- */}
            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Prix</Text>
            <ProPriceInput
                onChangeValue={setPrice}
                value={price}
                error={errors.price} 
            />
            </View>

            {/* --- SECTION VENDEUR --- */}
            <SectionHeader title="Informations du vendeur" />

            <View style={[styles.inputContainer, { zIndex: 2000 }]}>
            <Text style={styles.inputLabel}>Type vendeur *</Text>
            <SmartCombobox
                data={SellerTypeData} // Assurez-vous que c'est bien des SelectOption[]
                value={sellerTypeId}
                onChange={setSellerTypeId} // Plus besoin de 'as any'
                placeholder="Particulier, Garage..."
                error={errors.sellerType}
                zIndex={2000} 
            />
            </View>

            <View style={[styles.inputContainer, { zIndex: 1000 }]}>
            <Text style={styles.inputLabel}>Nom du vendeur</Text>
            <SmartCombobox
                data={names} // Doit être SelectOption[]
                value={sellerNameId}
                onChange={setSellerNameId}
                placeholder="Rechercher..."
                error={errors.sellerName}
                zIndex={1000}
            />
            </View>

            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Téléphone</Text>
            <PhoneInput
                value={phoneDisplay}
                onChange={(formatted, raw) => {
                    setPhoneDisplay(formatted); 
                    setPhoneRaw(raw);         
                }}
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <ProTextInput
                value={email}
                onChangeText={setEmail}
                placeholder="user@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
            />
             {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={[styles.inputContainer, { zIndex: 900 }]}>
             <Text style={styles.inputLabel}>Ville</Text>
             {/* Utilisation SmartCombobox pour ville si c'est une liste définie */}
             <SmartCombobox
                data={cities} 
                value={city}
                onChange={(val) => setCity(val as string)}
                placeholder="Casablanca..."
                error={errors.city}
                zIndex={900}
             />
            </View>

            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Adresse</Text>
            <ProTextInput
                value={address}
                onChangeText={setAddress}
                placeholder="Quartier, Rue..."
                multiline
                style={{ height: 50 }}
            />
            {errors.adress && <Text style={styles.errorText}>{errors.adress}</Text>}
            </View>

            {/* --- SECTION VÉHICULE --- */}
            <SectionHeader title="Informations du véhicule" />
            
            <View style={[styles.inputContainer,{zIndex:4000}]}>
            <Text style={styles.inputLabel}>Marque</Text>
            <SmartCombobox
                data={transBrnads(brands)}
                onChange={setMarqueId}
                value={marqueId}
                error={errors.marque}
                zIndex={4000}
            />
            </View>

            <View style={[styles.inputContainer,{zIndex:3000}]}>
            <Text style={styles.inputLabel}>Modèle</Text>
            <SmartCombobox
                data={transModels(models)}
                onChange={setModelId}
                value={modelId}
                error={errors.model}
                zIndex={3000}
            />
            </View>
            
            <View style={[styles.inputContainer,{zIndex:2000}]}>
                <Text style={styles.inputLabel}>Année</Text>
                <SmartCombobox
                    data={transYears(years)}
                    onChange={setYearId}
                    value={yearId}
                    error={errors.year}
                    zIndex={2000}
                />
            </View>

            <View style={[styles.inputContainer, {zIndex:1000}]}>
                <Text style={styles.inputLabel}>Mois</Text>
                <SmartCombobox
                    data={transMonths(months)}
                    onChange={setMonthId}
                    value={monthId}
                    zIndex={1000}
                />
            </View>
        
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Kilométrage</Text>
                <ProTextInput
                    onChangeText={setKm}
                    value={km}
                    placeholder='Ex: 120 000'
                    keyboardType="numeric"
                />
                {}
            </View>

            {/* --- PHOTO --- */}
            <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Photo voiture</Text>
            <TouchableOpacity
                onPress={handlePickImage} 
                activeOpacity={0.8}
                style={[styles.uploadButton, errors.picture ? {borderColor: 'red'} : null]}>
                <Text style={[styles.uploadText, errors.picture ? {color: 'red'} : null]}>
                    {picture ? 'Changer la photo' : 'Charger une photo'}
                </Text>
                <Upload size={20} color={errors.picture ? 'red' : COLORS.Bright_Royal_Blue} />
            </TouchableOpacity>
            
            {picture && (
                <View style={styles.fileFeedback}>
                    <Text style={styles.fileName} numberOfLines={1}>
                        {'Fichier: ' + picture.name}
                    </Text>
                </View>
            )}
            </View>

            {/* --- SUBMIT --- */}
            <TouchableOpacity
                onPress={handleSubmit}
                style={styles.submitButton} 
                activeOpacity={0.9}>
                <Text style={styles.submitText}>Confirmer</Text>
            </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

// Petit composant utilitaire pour éviter la répétition du header
const SectionHeader = ({ title }: { title: string }) => (
    <View style={styles.sectionHeader}>
        <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
            <FileText color={COLORS.white} size={16} /> 
        </View>
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
    </View>
);

export default AddCarScreen

const styles = StyleSheet.create({
  // ... (Vos styles existants sont bien, ajoutez juste celui pour l'erreur texte)
  container:{
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20
  },
  // ...
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  inputContainer:{
    gap: 8, 
    marginVertical: 8,
  },
  inputLabel:{
    fontSize: 14,
    fontFamily: fonts.light, 
    color: COLORS.black_lite
  },
  // ... reste des styles
  iconContainer:{
    width:52,
    height:52,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:COLORS.blue_light_v0,
    borderRadius:50
  },
  sectionHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
    marginBottom: 16
  },
  iconCircle:{
    backgroundColor: COLORS.Bright_Royal_Blue, 
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16
  },
  sectionTitle:{
    fontSize: 16,
    fontFamily: fonts.bold,
    color: COLORS.Bright_Royal_Blue
  },
  uploadButton:{
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.Bright_Royal_Blue,
    borderRadius: 100,
    backgroundColor: COLORS.white
  },
  uploadText:{
    fontSize: 14,
    fontFamily: fonts.semBold,
    color: COLORS.Bright_Royal_Blue
  },
  fileFeedback: {
      marginTop: 1,
      padding: 2,
  },
  fileName:{
    fontSize: 11,
    fontFamily: fonts.medium,
    color: STATUS.pub_text
  },
  submitButton:{
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.Bright_Royal_Blue,
    borderRadius: 100,
    marginTop: 20,
  },
  submitText:{
    fontFamily: fonts.bold,
    fontSize: 15,
    color: COLORS.white
  }
})