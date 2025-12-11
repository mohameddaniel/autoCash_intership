import { PencilLine } from 'lucide-react-native';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { COLORS } from '../utils/color.ui';
import { fonts } from '../utils/fonts';

interface ProPriceInputProps {
  value: number | null;
  // Accepte string, null ou undefined pour être plus flexible
  error?: string | null; 
  onChangeValue: (value: number | null) => void;
}

const ProPriceInput = ({ value, error, onChangeValue }: ProPriceInputProps) => {
  const inputRef = useRef<any>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={styles.wrapper}>
      <View style={[
        styles.container,
        !!error && styles.containerError // Ajoute la bordure rouge si erreur
      ]}>
        {/* Input Section */}
        <View style={styles.inputWrapper}>
          <CurrencyInput
            ref={inputRef}
            value={value}
            onChangeValue={onChangeValue}
            prefix="" 
            delimiter=" "
            separator="."
            precision={0} 
            minValue={0} 
            placeholder='EX: 300 000'
            placeholderTextColor={COLORS.slate_gray} // Changé pour gris (plus standard pour placeholder)
            style={styles.input}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity 
          onPress={handleFocus}
          activeOpacity={0.7}
          style={styles.iconButton}
        >
          <PencilLine fill={COLORS.black_lite} color={COLORS.black_lite} size={20}/>
        </TouchableOpacity>
      </View>
      
      {/* Affichage du message d'erreur */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default ProPriceInput;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 4, // Petit espace safe
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white_v1,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 56, // Standardisé à 56 (comme SmartCombobox)
    width: '100%',
    borderWidth: 1, // Préparé pour la bordure
    borderColor: 'transparent', // Invisible par défaut
  },
  containerError: {
    borderColor: '#EF4444', // Rouge erreur
    backgroundColor: '#FEF2F2', // Optionnel: fond très légèrement rouge
  },
  inputWrapper: {
    flex: 1,
    // Suppression du background ici pour qu'il prenne celui du container
  },
  input: {
    fontSize: 14,
    fontFamily: fonts.medium,
    color: COLORS.Bright_Royal_Blue,
    padding: 0,
    height: '100%', // Prend toute la hauteur pour faciliter le clic
  },
  iconButton: {
    padding: 5,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontFamily: fonts.light,
  }
});