// components/custom/input.text.tsx (Renomme l'autre en input.price.tsx)
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TextInputProps, Text } from 'react-native';
import { COLORS } from '../utils/color.ui';
import { fonts } from '../utils/fonts';

interface ProTextInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
}

const ProTextInput = ({ value, onChangeText, error, style, ...props }: ProTextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={[
        styles.container, 
        isFocused && styles.containerFocused,
        !!error && styles.containerError
      ]}>
        <TextInput
          style={[styles.input, style]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.slate_gray} 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props} 
        />
      </View>
      {error && <Text  style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default ProTextInput;

const styles = StyleSheet.create({
  wrapper: { 
    marginBottom: 0 
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white_v1,
    borderRadius: 12,
    height: 58,
  },
  containerFocused: {
    borderColor: COLORS.Bright_Royal_Blue,
    borderWidth:1
  },
  containerError: { 
    borderColor: 'red'
 },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.medium,
    color: COLORS.black_lite_v2,
    height: '100%',
    paddingHorizontal:15
  },
  errorText: { 
    color: 'red', 
    fontSize: 12, 
    marginTop: 4 
}
});