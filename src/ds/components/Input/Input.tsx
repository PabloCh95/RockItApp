import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { colors } from '../../theme';
import { createInputStyles } from './Input.styles';
import type { InputProps } from './Input.types';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  size = 'md',
  disabled = false,
  required = false,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const styles = createInputStyles({
    variant,
    size,
    disabled,
    hasError: !!error,
    isFocused,
  });
  
  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  
  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={{ color: colors.error[500] }}> *</Text>}
        </Text>
      )}
      
      <TextInput
        style={[styles.input, inputStyle]}
        editable={!disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      
      {error && (
        <Text style={[styles.error, errorStyle]}>
          {error}
        </Text>
      )}
      
      {helperText && !error && (
        <Text style={styles.helper}>
          {helperText}
        </Text>
      )}
    </View>
  );
};