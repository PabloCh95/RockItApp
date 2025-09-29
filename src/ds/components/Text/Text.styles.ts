import { StyleSheet } from 'react-native';
import { colors, typography } from '../../theme';
import type { TextStyleProps } from './Text.types';

export const createTextStyles = (props: TextStyleProps) => {
  const { variant, color, align, transform } = props;
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: typography.fontSize['4xl'],
          fontWeight: typography.fontWeight.bold,
        };
      case 'h2':
        return {
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.bold,
          
        };
      case 'h3':
        return {
          fontSize: typography.fontSize['2xl'],
          fontWeight: typography.fontWeight.semibold,
         
        };
      case 'h4':
        return {
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.semibold,
        
        };
      case 'h5':
        return {
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.medium,
          
        };
      case 'h6':
        return {
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.medium,
          
        };
      
      case 'body1':
        return {
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.normal,
        };
      case 'body2':
        return {
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.normal,
        };
      case 'body3':
        return {
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.normal,
        };
      
      case 'caption':
        return {
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.normal,
        };
      case 'overline':
        return {
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.medium,
          textTransform: 'uppercase' as const,
        };
      case 'button':
        return {
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
        };
      
      case 'label':
        return {
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
        };
      case 'helper':
        return {
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.normal,
        };
      
      default:
        return {
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.normal,
        };
    }
  };
  
  const getColorStyles = () => {
    switch (color) {
      case 'primary':
        return { color: colors.primary[500] };
      case 'secondary':
        return { color: colors.neutral[600] };
      case 'tertiary':
        return { color: colors.neutral[500] };
      case 'success':
        return { color: colors.success[500] };
      case 'error':
        return { color: colors.error[500] };
      case 'warning':
        return { color: colors.warning[500] };
      case 'neutral':
        return { color: colors.neutral[700] };
      case 'inverse':
        return { color: colors.neutral[0] };
      case 'inherit':
        return {}; 
      default:
        return { color: colors.neutral[900] };
    }
  };
  
  const getAlignStyles = () => {
    switch (align) {
      case 'left':
        return { textAlign: 'left' as const };
      case 'center':
        return { textAlign: 'center' as const };
      case 'right':
        return { textAlign: 'right' as const };
      case 'justify':
        return { textAlign: 'justify' as const };
      default:
        return { textAlign: 'left' as const };
    }
  };
  
  const getTransformStyles = () => {
    switch (transform) {
      case 'uppercase':
        return { textTransform: 'uppercase' as const };
      case 'lowercase':
        return { textTransform: 'lowercase' as const };
      case 'capitalize':
        return { textTransform: 'capitalize' as const };
      default:
        return { textTransform: 'none' as const };
    }
  };
  
  return StyleSheet.create({
    text: {
      fontFamily: typography.fontFamily.regular,
      ...getVariantStyles(),
      ...getColorStyles(),
      ...getAlignStyles(),
      ...getTransformStyles(),
    },
  });
};