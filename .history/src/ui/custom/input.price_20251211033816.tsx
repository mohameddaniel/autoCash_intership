import { Edit, PencilLine } from 'lucide-react-native';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import { COLORS } from '../utils/color.ui';
import { fonts } from '../utils/fonts';

interface ProPriceInputProps {
  value: number | null;
  error:string |null;
  onChangeValue: (value: number | null) => void;
}

const ProPriceInput = ({ value, error,onChangeValue }: ProPriceInputProps) => {
  const inputRef = useRef<any>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
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
          placeholder='EX:300 000'
          placeholderTextColor={COLORS.Bright_Royal_Blue}
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
  );
};

export default ProPriceInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:COLORS.white_v1,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 58,
    width: '100%',
  },
  inputWrapper: {
    flex: 1,
    backgroundColor:COLORS.white_v1
  },
  input: {
    fontSize: 14,
    fontFamily:fonts.medium,
    color:COLORS.Bright_Royal_Blue,
    padding: 0,
  },

  iconButton: {
    padding: 5,
  },
});