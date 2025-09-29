import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface StoreIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const StoreIcon: React.FC<StoreIconProps> = ({
  width = 24,
  height = 24,
  color = '#000000'
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Rect
        x="4"
        y="8"
        width="16"
        height="12"
        fill={color}
      />
      
      <Rect
        x="6"
        y="10"
        width="3"
        height="4"
        fill="transparent"
        stroke={color}
        strokeWidth="0.5"
      />
      
      <Rect
        x="15"
        y="10"
        width="3"
        height="6"
        fill="transparent"
        stroke={color}
        strokeWidth="0.5"
      />
      
      <Path
        d="M2 8 L4 6 L6 8 L8 6 L10 8 L12 6 L14 8 L16 6 L18 8 L20 6 L22 8 L22 10 L2 10 Z"
        fill={color}
      />
    </Svg>
  );
};

export default StoreIcon;