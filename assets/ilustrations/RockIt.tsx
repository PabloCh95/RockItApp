import React from 'react';
import Svg, { Rect, Text } from 'react-native-svg';

interface LogoProps {
  width?: number;
  height?: number;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  width = 120, 
  height = 60, 
  color = '#000000' 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 60 60">
      <Rect x="0" y="0" width="60" height="30" fill="#000000" stroke="#000000" strokeWidth="1" />
      
      <Text
        x="30"
        y="20"
        fontSize="16"
        fontWeight="900"
        fill="#FFFFFF"
        textAnchor="middle"
        fontFamily="ND Alias Bold"
      >
        IT
      </Text>
      
      <Rect x="0" y="30" width="60" height="30" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
      
      <Text
        x="30"
        y="50"
        fontSize="16"
        fontWeight="900"
        fill="#000000"
        textAnchor="middle"
        fontFamily="ND Alias Bold"
      >
        ROCK
      </Text>
    </Svg>
  );
};

export default Logo;