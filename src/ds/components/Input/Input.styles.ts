import { StyleSheet } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../../theme';
import type { InputStyleProps } from './Input.types';

export const createInputStyles = (props: InputStyleProps) => {
  const { variant, size, disabled, hasError, isFocused } = props;
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return {
          backgroundColor: colors.neutral[0],
          borderWidth: 1,
          borderColor: hasError ? colors.error[500] : isFocused ? colors.primary[500] : colors.neutral[300],
        };
      case 'filled':
        return {
          backgroundColor: disabled ? colors.neutral[100] : colors.neutral[50],
          borderWidth: 0,
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: hasError ? colors.error[500] : isFocused ? colors.primary[500] : colors.neutral[300],
        };
      default:
        return {};
    }
  };
  
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingHorizontal: spacing[3],
          paddingVertical: spacing[2],
          minHeight: 32,
          fontSize: typography.fontSize.sm,
        };
      case 'md':
        return {
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[3],
          minHeight: 40,
          fontSize: typography.fontSize.base,
        };
      case 'lg':
        return {
          paddingHorizontal: spacing[5],
          paddingVertical: spacing[4],
          minHeight: 48,
          fontSize: typography.fontSize.lg,
        };
      default:
        return {};
    }
  };
  
  return StyleSheet.create({
    container: {
      marginBottom: spacing[4],
    },
    label: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      color: colors.neutral[700],
      marginBottom: spacing[1],
    },
    input: {
      borderRadius: borderRadius.base,
      color: colors.neutral[900],
      ...getVariantStyles(),
      ...getSizeStyles(),
    },
    error: {
      fontSize: typography.fontSize.xs,
      color: colors.error[500],
      marginTop: spacing[1],
    },
    helper: {
      fontSize: typography.fontSize.xs,
      color: colors.neutral[500],
      marginTop: spacing[1],
    },
  });
};