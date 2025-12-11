import { StatusBar, StyleSheet, TextInput, View, TouchableOpacity, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../utils/color.ui'
import { Bell, CircleEllipsis, CircleOff, ListFilter, Search } from 'lucide-react-native'
import { fonts } from '../../utils/fonts'
import LinearGradient from 'react-native-linear-gradient'
import { buttonName } from '../../utils/button.filter'
import { useActiveColors } from '../../utils/function.active'
import { CARS } from '../../../store/data'
import Card from '../../custom/card.custom-component'
import FAB from '../../custom/floating-action.button'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackParamList } from '../../routes/stack.root'
import { useAppDispatch, useAppSelector } from '../../../store/redux/store/redux.hooks'
import { fetchCarsAction } from '../../../store/redux/features/fetch/fetchCar/fetch.car'    
import CardSkeleton from '../../custom/CardSkeleton'


const HomeScreen = () => {
    const [isAcitive,setIsActive] = useState('all')
    const {text_color,backgroud_color} = useActiveColors()
    const navigation = useNavigation<StackNavigationProp<StackParamList>>()
    const {cars,isLoading} = useAppSelector((state) => state.car)
    const dispatch = useAppDispatch()

   useEffect(() => {
    (async () => {
        await dispatch(fetchCarsAction());
    })();
    }, []);

    console.log(cars)
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar animated backgroundColor={COLORS.white} barStyle={'dark-content'}/>
        <LinearGradient colors={[COLORS.white,COLORS.lite]} style={{flex:1,paddingHorizontal:16}}>
            
        <FAB onPress={() => navigation.navigate('addCar')}/>
        {/* Header Container */}
        <View style={styles.headerRow}>
    
            <View style={styles.searchContainer}>
                <Search size={20} color={COLORS.slate_gray}/>
                <TextInput
                    style={styles.textInput}
                    placeholder='Rechercher une voiture'
                    placeholderTextColor={COLORS.slate_gray}
                    inputMode='search'
                />
            </View>

            <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
                <ListFilter color={COLORS.Bright_Royal_Blue} size={22}/>
            </TouchableOpacity>

            <View style={styles.actionsContainer}>
                <TouchableOpacity activeOpacity={0.7}>
                    <Bell size={24} color={COLORS.black_lite_v2} />
                </TouchableOpacity>
                
                <TouchableOpacity activeOpacity={0.7}>
                    <CircleEllipsis size={24} color={COLORS.black_lite_v2} />
                </TouchableOpacity>
            </View>
        </View>
        
        <View style={styles.FilterContainer}>
            {
                buttonName.map((item,index) => {
                    return(
                        <TouchableOpacity 
                          style={[styles.ButtonStyle, isAcitive === item.token &&{backgroundColor:backgroud_color}]} 
                          onPress={() => setIsActive(item.token)}
                          key={index}>
                            <Text style={[styles.TextButton, isAcitive === item.token &&{color:text_color}]}>
                                {item.name}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
        {/* body container  */}
        { isLoading ? (
            <View>
                {[1, 2, 3, 4, 5].map((item) => (
                <CardSkeleton key={item} />
                ))}
           </View>
        ):(
        <View>
            <FlatList
              data={cars as any}
              keyExtractor={(item) => item?.id}
              renderItem={({item}) => <Card data={item as any}/>}
              numColumns={1}
              pagingEnabled
              ListEmptyComponent={() =>(
                <View style={styles.empty}>
                     <Text style={styles.emptyText}>No data aviable</Text>
                      <CircleOff size={20} color={COLORS.Bright_Royal_Blue}/>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom:130
              }}
                />
        </View>
        )}
        </LinearGradient>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    headerRow:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        gap: 12,
    },
   
    searchContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.slate_gray,
        borderRadius: 40,
        paddingHorizontal: 12,
    },
    textInput: {
        flex: 1,
        height: '100%',
        color: COLORS.black_lite,
        fontSize:12,
        fontFamily:fonts.regular
        
    },
    filterButton:{
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.Bright_Royal_Blue,
        borderRadius: 23,
    },
    actionsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginLeft: 4 
    },
    FilterContainer:{
        flexDirection:'row',
        height:52,
        backgroundColor:COLORS.white,
        elevation:2,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:40,
        paddingHorizontal:16,
        marginBottom:8,
        gap:3,
    },
    ButtonStyle:{
        flex:1,
        backgroundColor:COLORS.white,
        height:38,
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center'
    },
    TextButton:{
        color:COLORS.black_lite,
        fontFamily:fonts.medium,
        fontSize:13
    },
    emptyText:{
        fontSize:18,
        color:COLORS.Bright_Royal_Blue,
        fontFamily:fonts.medium
    },
    empty:{
        alignItems:'center',
        justifyContent:'center',
        gap:10
    }
})