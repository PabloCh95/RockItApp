import React from 'react';
import { Text as RNText } from 'react-native';
import { createTextStyles } from './Text.styles';
import type { TextProps } from './Text.types';

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body1',
  color = 'neutral',
  align = 'left',
  transform = 'none',
  numberOfLines,
  ellipsizeMode = 'tail',
  style,
  testID,
  ...props
}) => {
  const styles = createTextStyles({
    variant,
    color,
    align,
    transform,
  });
  
  return (
    <RNText
      style={[styles.text, style && { ...style } as any]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      testID={testID}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;