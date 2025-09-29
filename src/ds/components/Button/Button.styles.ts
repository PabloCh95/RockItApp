import { StyleSheet } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../../theme';
import type { ButtonStyleProps } from './Button.types';

export const createButtonStyles = (props: ButtonStyleProps) => {
  const { variant, size, disabled, loading } = props;
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? colors.neutral[300] : colors.primary[500],
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? colors.neutral[200] : colors.neutral[100],
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? colors.neutral[300] : colors.primary[900],
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
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
        };
      case 'md':
        return {
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[3],
          minHeight: 40,
        };
      case 'lg':
        return {
          paddingHorizontal: spacing[6],
          paddingVertical: spacing[4],
          minHeight: 48,
        };
      default:
        return {};
    }
  };
  
  return StyleSheet.create({
    button: {
      borderRadius: borderRadius.base,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      opacity: disabled ? 0.6 : 1,
      ...getVariantStyles(),
      ...getSizeStyles(),
    },
    text: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.medium,
      color: variant === 'primary' ? colors.neutral[0] : colors.primary[900],
    },
    loadingContainer: {
      marginRight: spacing[2],
    },
  });
};