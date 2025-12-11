import SkeletonItem from "./SkeletonItem";
import { View,StyleSheet } from "react-native";
import { COLORS } from "../utils/color.ui";


const CardSkeleton = () => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        
        <SkeletonItem width={100} height={90} borderRadius={12} />
        
        <View style={styles.detailsBox}>
          
          <View style={styles.headerRow}>
            <SkeletonItem width={60} height={14} />
            
            <View style={styles.priceBadgeSkeleton}>
               <SkeletonItem width={70} height={24} borderRadius={0} /> 
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
             <SkeletonItem width="80%" height={18} />
          </View>
          
          <View style={styles.metaRow}>
            {/* Vendeur */}
            <View style={styles.metaItem}>
               <SkeletonItem width={18} height={18} borderRadius={9} />
               <SkeletonItem width={50} height={12} />
            </View>

            {/* Localisation */}
            <View style={styles.metaItem}>
               <SkeletonItem width={16} height={16} borderRadius={8} />
               <SkeletonItem width={60} height={12} />
            </View>
          </View>

        </View>
      </View>

      <View style={styles.divider}/>

      <View style={styles.footer}>
        <View style={styles.dateContainer}>
           <SkeletonItem width={16} height={16} borderRadius={4} />
           <SkeletonItem width={80} height={12} />
        </View>

        <SkeletonItem width={70} height={24} borderRadius={20} />
      </View>
    </View>
  )
}

export default CardSkeleton;

// --- STYLES (Copiés et adaptés de votre Card.tsx pour garantir l'alignement) ---
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    marginVertical: 5,
    borderRadius: 23,
    elevation: 3, // Conserver l'élévation pour que ça ressemble à la vraie carte
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent' // Astuce pour éviter les sauts de pixel
  },
  cardContent: {
    flexDirection: 'row',
    gap: 12,
    padding: 12,
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
  // Simulation du style spécifique du badge prix
  priceBadgeSkeleton: {
    overflow: 'hidden',
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12, // Match l'original
    position: 'absolute',
    right: -12, 
    top: -12,
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
});
