import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FileText, Upload } from 'lucide-react-native'
import { pick, types, DocumentPickerResponse } from '@react-native-documents/picker'

import { COLORS, STATUS } from '../../utils/color.ui'
import { fonts } from '../../utils/fonts'
import ProPriceInput from '../../custom/input.price' 
import ProTextInput from '../../custom/input.text'   
import SmartCombobox from '../../custom/comboBox.component'
import PhoneInput from '../../custom/phone.input'


import { SellerTypeData } from '../../../store/data/siller.type'
import { SillerNameData } from '../../../store/data/siller.name'

import { RegisterInput, registerSequenceAction } from '../../../store/redux/features/car/car.save.infos'
import { useAppDispatch, useAppSelector } from '../../../store/redux/store/redux.hooks'
import { cities } from '../../../store/data/cities.maorc'
import { fetchNames } from '../../../store/redux/features/fetch/fetchNames/fetch.names'
import LoadingCycle from '../../custom/loading.cycle'
import { fetchBrandAction } from '../../../store/redux/features/fetch/fetchBrand/Brand.fetch'
import { fetchMonths } from '../../../store/redux/features/fetch/fetchMonths/fetch.months'
import { fetchYears } from '../../../store/redux/features/fetch/fetchYears/fetch.years'

const AddCarScreen = () => {

  const [price, setPrice] = useState<number | null>();
  const [picture, setPicture] = useState<DocumentPickerResponse | null>(null);
  
  // Vendeur
  const [sellerType, setSellerType] = useState(''); 
  const [sellerName, setSellerName] = useState('');
  const [phoneDisplay, setPhoneDisplay] = useState('');
  const [phoneRaw, setPhoneRaw] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  // Voiture
  const [marque, setMarque] = useState('');
  const [model, setModel] = useState('');
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('');
  const [km, setKm] = useState<number | null>(null);

  const dispatch = useAppDispatch()
  const {success} = useAppSelector((state) => state.register)
  const {names,isLoading} = useAppSelector((state) => state.name)
  const {brands,isLoading:isLoadingbrand} = useAppSelector((state) => state.brand)
  const {months} = useAppSelector((state) => state.month)
  const {years} = useAppSelector((state) => state.year)


  const handlePickImage = async () => {
    try {
      const [result] = await pick({
        type: [types.images],
        mode: 'import',
        allowMultiSelection: false,
      });
      setPicture(result);
    } catch (err:any) {
      if (!err.code?.includes('CANCELED')) console.error(err);
    }
  }

  useEffect(() => {
    dispatch(fetchNames())
    dispatch(fetchBrandAction())
    dispatch(fetchMonths(1))
    dispatch(fetchYears(1))
  },[])
   




  return (
    <SafeAreaView style={styles.container}>
      <LoadingCycle isLoadingCycle={isLoading}/>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        keyboardShouldPersistTaps="handled">
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Prix</Text>
          <ProPriceInput
            onChangeValue={setPrice as any}
            value={price as any}

          />
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
             <FileText color={COLORS.white} size={16} /> 
          </View>
          </View>
          <Text style={styles.sectionTitle}>Informations du vendeur</Text>
        </View>

        <View style={[styles.inputContainer, { zIndex: 2000 }]}>
          <Text style={styles.inputLabel}>Type vendeur</Text>
          <SmartCombobox
            data={SellerTypeData}
            value={sellerType}
            onChange={setSellerType}
            placeholder="Particulier, Garage..."
            zIndex={2000} 
          />
        </View>

        <View style={[styles.inputContainer, { zIndex: 1000 }]}>
          <Text style={styles.inputLabel}>Nom du vendeur</Text>
          <SmartCombobox
            data={names}
            value={sellerName}
            onChange={setSellerName}
            placeholder="Rechercher..."
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
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Ville</Text>
          <ProTextInput
            value={city}
            onChangeText={setCity}
            placeholder="Casablanca, Rabat..."
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
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
             <FileText color={COLORS.white} size={16} /> 
          </View>
          </View>
          <Text style={styles.sectionTitle}>Informations du véhicule</Text>
        </View>
        
        <View style={[styles.inputContainer,{zIndex:2000}]}>
          <Text style={styles.inputLabel}>Marque</Text>
          <SmartCombobox
           data={['Audi','BMW','Toyota','tesla']}
           onChange={setMarque}
           value={marque}
           />
        </View>

        <View style={[styles.inputContainer,{zIndex:1000}]}>
          <Text style={styles.inputLabel}>Modèle</Text>
          <SmartCombobox
           data={['R1','R2','R3','R4']}
           onChange={setModel}
           value={model}
           />
        </View>
        
       
        <View style={[styles.inputContainer,{zIndex:1001}]}>
            <Text style={styles.inputLabel}>Année de mise en circulation</Text>
            <SmartCombobox
              data={['2021','2022','2024','2023']}
              onChange={setYear}
              value={year}
             />
        </View>

        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mois de mise en circulation</Text>
            <SmartCombobox
              data={['01','02','04','05']}
              onChange={setMonth}
              value={month}
             />
        </View>
    
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Kilométrage</Text>
            <ProTextInput
              onChangeText={setKm as any}
              value={km as any}
              placeholder='Ex:120 000'
             />
        </View>

         <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Ville</Text>
          <SmartCombobox
            data={cities}
            value={city}
            onChange={setCity}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Photo voiture</Text>
          <TouchableOpacity
             onPress={handlePickImage} 
             activeOpacity={0.8}
             style={styles.uploadButton}>
             <Text style={styles.uploadText}>
                {picture ? 'Changer la photo' : 'Charger une photo'}
             </Text>
             <Upload size={20} color={COLORS.Bright_Royal_Blue} />
          </TouchableOpacity>
          
          {picture && (
              <View style={styles.fileFeedback}>
                  <Text style={styles.fileName} numberOfLines={1}>
                     {'Le fichier a été importé ' +picture.name}
                  </Text>
              </View>
          )}
        </View>

        <TouchableOpacity
           onPress={() => {
            const data:RegisterInput = {
              car:{
                mile_age:12323,
                car_month:3,
                car_price:120000,
                car_year:2014,
                city:'casa',
                id_brand:1,
                id_model:5,
                id_seller:1,
              },
              user:{
                address:'casa user',
                city:'casa',
                email:'daniel@gmail.com',
                phone:'0770664822',
                sellerName:'daniel',
                sellerType:'pro',
              },
              image:{
                type:picture?.type,
                name:picture?.name,
                uri:picture?.uri
              }
            }
            dispatch(registerSequenceAction(data))
           }}
           style={styles.submitButton} 
           activeOpacity={0.9}>
           <Text style={styles.submitText}>Confirmer</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddCarScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20
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
    shadowColor: COLORS.Bright_Royal_Blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  submitText:{
    fontFamily: fonts.bold,
    fontSize: 15,
    color: COLORS.white
  }
})