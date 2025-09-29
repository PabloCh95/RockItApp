import { TextInputProps, TextStyle, ViewStyle } from 'react-native';

export type InputVariant = 'default' | 'filled' | 'outlined';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
  required?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export interface InputStyleProps {
  variant: InputVariant;
  size: InputSize;
  disabled: boolean;
  hasError: boolean;
  isFocused: boolean;
}