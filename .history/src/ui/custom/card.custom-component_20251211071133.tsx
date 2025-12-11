import React from 'react'
import { Image, StyleSheet, Text, View,  } from 'react-native'
import { CalendarDays, MapPinned, TextSearch, Warehouse } from 'lucide-react-native'
import { CarItemType } from '../../types/car.info.type' 
import { COLORS } from '../utils/color.ui'
import { fonts } from '../utils/fonts'
import { since } from '../utils/function.time'
import { getStatusColors } from '../utils/status.function'
import { CarResponse } from '../../store/redux/features/fetch/fetchCar/fetch.car'

type CardProps = {
  data: CarResponse;
}

const PLACEHOLDER_CAR = require('../../../assets/home.asset/Image.png')

const Card: React.FC<CardProps> = ({ data }) => {
  
  const statusTheme = getStatusColors(data?.category)

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        
        <Image 
          style={styles.image} 
          source={PLACEHOLDER_CAR} 
        />
        
        <View style={styles.detailsBox}>
          
          <View style={styles.headerRow}>
            <View style={styles.refContainer}>
              <TextSearch color={COLORS.Bright_Royal_Blue} size={20} />
              <Text  numberOfLines={1} style={styles.refText}>{`Réf: ${data?.id || 'N/A'}`}</Text>
            </View>

          
            <View style={styles.priceBadge}>
              <Text style={styles.priceText}>{`${data?.price || 'N/A'} DH`}</Text>
            </View>
          </View>datePublication

          <Text style={styles.carName} numberOfLines={1}>
            {data?.model || 'N/A' + ' ' + data?.brands + 'N/A'}
          </Text>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <View style={styles.iconBackground}>
                 <Warehouse size={12} color={COLORS.Bright_Royal_Blue}/>
              </View>
              <Text style={styles.metaText} numberOfLines={1}>{data?.SellerName || 'N/A'}</Text>
            </View>

            <View style={styles.metaItem}>
              <MapPinned opacity={0.8} size={16} color={COLORS.black_lite}/>
              <Text style={styles.metaText} numberOfLines={1}>{data?.ville || 'N/A'}</Text>
            </View>
          </View>

        </View>
      </View>

      <View style={styles.divider}/>

      <View style={styles.footer}>
        <View style={styles.dateContainer}>
          <CalendarDays size={16} color={COLORS.Bright_Royal_Blue}/>
          <Text style={styles.dateText}>{since(data?.createAt)}</Text>
        </View>

        <View style={[
            styles.statusBadge, 
            { 
              backgroundColor: statusTheme?.back_color, 
              borderColor: statusTheme?.text_color 
            }
        ]}>
          <Text style={[
            styles.statusText, 
            { color: statusTheme?.text_color }
          ]}>
            {data?.category || 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    marginVertical: 5,
    borderRadius: 23,
    elevation: 3,
    overflow: 'hidden'
  },
  cardContent: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
  },
  image: {
    width: 100,
    height: 90,
    resizeMode: 'cover', 
    borderRadius: 12,
    backgroundColor: COLORS.lite 
  },
  detailsBox: {
    flex: 1,
    justifyContent: 'space-between', 
    paddingVertical: 2
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  refContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  refText: {
    fontSize: 13,
    fontFamily: fonts.medium,
    color: COLORS.Bright_Royal_Blue
  },
  priceBadge: {
    backgroundColor: COLORS.Bright_Royal_Blue,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    position: 'absolute',
    right: -12, 
    top: -12,  
  },
  priceText: {
    fontSize: 12,
    color: COLORS.white,
    fontFamily: fonts.bold
  },
  carName: {
    color: COLORS.black_lite,
    fontFamily: fonts.bold,
    fontSize: 15,
    marginTop: 15 
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    maxWidth: '48%' 
  },
  iconBackground: {
    height: 18,
    width: 18,
    backgroundColor: COLORS.blue_light,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9
  },
  metaText: {
    color: COLORS.slate_gray,
    fontFamily: fonts.medium,
    fontSize: 11
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  dateText: {
    color: COLORS.slate_gray,
    fontFamily: fonts.medium,
    fontSize: 12
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 11,
    fontFamily: fonts.bold,
    textTransform: 'capitalize'
  }
});