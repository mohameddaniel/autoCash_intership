import React, { useState, useMemo, useRef, useCallback, memo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Keyboard,
  ViewStyle,
} from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native'; 
import { COLORS } from '../utils/color.ui';
import { fonts } from '../utils/fonts';
import { NamesType } from '../../store/redux/features/fetch/fetchNames/fetch.names';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ... (Imports inchangés)

interface SmartComboboxProps {
  label?: string;
  data: NamesType[];
  // La valeur est l'ID (nombre ou chaîne), ou undefined
  value: number | string | undefined; 
  // La fonction retourne l'ID de l'élément sélectionné
  onChange: (id: number | string | undefined) => void; 
  placeholder?: string;
  error?: string;
  style?: ViewStyle;
  zIndex?: number; 
}

const SmartCombobox = ({
  data,
  value,
  onChange,
  placeholder = "Sélectionnez...",
  error,
  style,
  zIndex = 10, 
}: SmartComboboxProps) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // 1. Déterminer l'élément sélectionné par son ID
  const selectedItem = useMemo(() => {
    // Utiliser un `==` pour comparer id (number/string) et value (number/string)
    return data.find(item => item.id == value); 
  }, [data, value]);

  // 2. Utiliser searchText pour l'affichage/la recherche
  // Initialisation : utilise le nom de l'élément sélectionné ou une chaîne vide.
  const [searchText, setSearchText] = useState(selectedItem ? selectedItem.name : '');


  // 3. Synchronisation de searchText quand la 'value' (ID) change de l'extérieur
  // Ce Hook garantit que si la prop 'value' change (ex: formulaire réinitialisé), 
  // l'input affiche le nom correspondant.
  React.useEffect(() => {
      setSearchText(selectedItem ? selectedItem.name : '');
  }, [selectedItem]);


  // 4. Logique de Filtrage (sur le nom)
  const filteredData = useMemo(() => {
    if (!searchText) return data;
    const lowerSearchText = searchText.toLowerCase();
    // Utilisation de ?. pour la sécurité
    return data.filter(item => item?.name?.toLowerCase().includes(lowerSearchText));
  }, [data, searchText]);
  


  // 5. Gestion de la Sélection (Retourne l'ID au parent)
  const handleSelect = useCallback((item: NamesType) => {
    // L'input affiche le nom
    setSearchText(item?.name); 
    
    // Le parent reçoit l'ID (valeur pour la BDD)
    onChange(item?.id); 
    
    Keyboard.dismiss();
    toggleList(false);
  }, [onChange]);

  // Gestion des toggles (inchangée)
  const toggleList = (shouldOpen: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(shouldOpen);
  };

  const handleTogglePress = () => {
    if (isOpen) {
      Keyboard.dismiss();
      toggleList(false);
    } else {
      inputRef.current?.focus();
      toggleList(true);
    }
  };


  return (
    
    <View style={[styles.wrapper, style, { zIndex }]}> 
      
      <View style={styles.relativeContainer}>
     
        <View style={[
          styles.container, 
          isOpen && styles.containerActive, 
          !!error && styles.containerError
        ]}>
          <TextInput
            ref={inputRef}
            // Affiche le nom ou le texte tapé
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text); 
              
              // Déselectionne l'ID si le texte ne correspond plus ou est vide
              if (text === '' && value !== undefined) {
                  onChange(undefined);
              }
              // Si l'utilisateur tape et que la liste est fermée, on l'ouvre
              if (!isOpen) toggleList(true);
            }}
            onFocus={() => toggleList(true)}
            placeholder={placeholder}
            placeholderTextColor= {COLORS.slate_gray}
            style={styles.input}
          />
          <TouchableOpacity 
            onPress={handleTogglePress} 
            style={styles.iconButton}
            activeOpacity={0.7}
          >

             <ChevronDown 
                size={30} 
                color={COLORS.black_lite_v2}
                fill={COLORS.black_lite_v2}
                style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
             />
          </TouchableOpacity>
        </View>

        {isOpen && filteredData.length > 0 && (
          <View style={styles.dropdown}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled={true}
              style={{ maxHeight: 200 }}
              showsVerticalScrollIndicator={true}
            >
              {filteredData.map((item) => {
                
                 // VÉRIFICATION : utilise item.id pour comparer à la prop 'value'
                 const isSelected:boolean = item.id == value; 
                 return (
                  <TouchableOpacity 
                    key={item.id} // Utiliser l'ID comme clé
                    style={[styles.item, isSelected && styles.itemSelected]} 
                    onPress={() => handleSelect(item)} 
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
                        {item.name} // Affiche le NOM
                    </Text>
                    {isSelected && <Check size={16} color={COLORS.Bright_Royal_Blue} />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default memo(SmartCombobox);



const styles = StyleSheet.create({
  wrapper: { 
    position: 'relative' 
  },
  relativeContainer: {
    position: 'relative', 
  },
  container: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: COLORS.white_v1, 
    borderRadius: 12, 
    height: 56,
    paddingHorizontal: 12 
  },
  containerActive: { 
    borderColor: COLORS.Bright_Royal_Blue, 
    backgroundColor: COLORS.white, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0 
  },
  containerError: { 
    borderColor: '#EF4444' 
  },
  input: { 
    flex: 1, 
    fontSize: 14, 
    color: COLORS.black_lite_v2,
    fontFamily:fonts.medium ,
    height: '100%',
    paddingVertical: 0 
  },
  iconButton: { 
    padding: 4,
    marginLeft: 4
  },
  dropdown: { 
    position: 'absolute', 
    top: '100%', 
    left: 0, 
    right: 0, 
    backgroundColor: COLORS.white, 
    borderWidth: 1, 
    borderColor: COLORS.white_v1, 
    borderTopWidth: 0, 
    borderBottomLeftRadius: 8, 
    borderBottomRightRadius: 8, 
    zIndex: 1000 
  },
  item: { 
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.white_v1, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  itemSelected: {
    backgroundColor: COLORS.blue_light_v0
  },
  itemText: { 
    fontSize: 14, 
    color: COLORS.black_lite_v2
  },
  itemTextSelected: {
    color: COLORS.Bright_Royal_Blue,
    fontWeight: '600'
  },
  errorText: { 
    color: '#EF4444', 
    fontSize: 12, 
    marginTop: 4,
    marginLeft: 2
  }
});