import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
} from 'react-native';
import { COLORS } from '../utils/color.ui';
import { fonts } from '../utils/fonts';

interface PhoneInputProps {
  value: string;
  onChange: (formatted: string, raw: string) => void;
  error?: string;
}

const PhoneInput = ({ value, onChange, error }: PhoneInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleTextChange = (text: string) => {
    let cleaned = text.replace(/\D/g, '');

    if (cleaned.length > 10) {
      cleaned = cleaned.substring(0, 10);
    }

    let formatted = cleaned;
    if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    }
    if (cleaned.length > 6) {
      formatted = `${cleaned.slice(0, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6)}`;
    }
    if (cleaned.length > 8) {
      formatted = `${cleaned.slice(0, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
    }

    onChange(formatted, cleaned);
  };

  return (
    <View style={styles.wrapper}>
      <View style={[
        styles.container, 
        isFocused && styles.containerFocused, 
        !!error && styles.containerError
      ]}>
        
        <View style={styles.prefixWrapper}>
            <Text style={styles.prefixText}>+212</Text>
        </View>
        
        {/* PARTIE 2 : Le numéro local */}
        <TextInput
          style={styles.input}
          value={value} 
          onChangeText={handleTextChange}
          placeholder="0661 89 78 66"
          placeholderTextColor={COLORS.slate_gray}
          keyboardType="number-pad" 
          maxLength={13}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 0, 
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white_v1,
    borderRadius: 12, 
    height: 56, 
    borderWidth: 1,
    borderColor: 'transparent' 
  },
  containerFocused: {
    backgroundColor: COLORS.white_v1,
    borderColor: COLORS.Bright_Royal_Blue,
  },
  containerError: {
    borderColor: '#EF4444',
    borderWidth: 1,
  },
  prefixWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 12
  },
  prefixText: {
      fontSize: 14,
      fontFamily: fonts.bold,
      color: COLORS.black_lite_v2,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    fontFamily: fonts.medium,
    color: COLORS.black_lite_v2,
    paddingVertical: 0, 
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    marginLeft: 4,
    fontFamily: fonts.regular,
  }
});