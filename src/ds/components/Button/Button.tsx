import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../theme';
import { createButtonStyles } from './Button.styles';
import type { ButtonProps } from './Button.types';

function Button ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  onPress,
  ...props
}: ButtonProps) {
  const styles = createButtonStyles({ variant, size, disabled, loading });
  
  const handlePress = () => {
    if (!disabled && !loading && onPress) {
      onPress();
    }
  };
  
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handlePress}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? '#FFFFFF' : colors.primary[500]}
          style={styles.loadingContainer}
        />
      )}
      <Text style={[styles.text, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;