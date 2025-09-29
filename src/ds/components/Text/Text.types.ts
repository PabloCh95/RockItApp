import { ReactNode } from 'react';
import { TextProps as RNTextProps, TextStyle } from 'react-native';

export type TextVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'  
  | 'body1' | 'body2' | 'body3'              
  | 'caption' | 'overline' | 'button'        
  | 'label' | 'helper';                      

export type TextColor = 
  | 'primary' | 'secondary' | 'tertiary'     
  | 'success' | 'error' | 'warning'          
  | 'neutral' | 'inverse'                    
  | 'inherit';                               

export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

export interface TextProps extends Omit<RNTextProps, 'style'> {
  children: ReactNode;
  variant?: TextVariant;
  color?: TextColor;
  align?: TextAlign;
  transform?: TextTransform;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  style?: TextStyle;
  testID?: string;
}

export interface TextStyleProps {
  variant: TextVariant;
  color: TextColor;
  align: TextAlign;
  transform: TextTransform;
}
