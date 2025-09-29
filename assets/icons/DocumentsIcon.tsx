import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

interface DocumentIconProps {
  width?: number;
  height?: number;
  color?: string;
  shadowColor?: string;
}

export const DocumentIcon: React.FC<DocumentIconProps> = ({
  width = 24,
  height = 24,
  color = '#000000',
  shadowColor = '#00000020'
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Rect
        x="2"
        y="2"
        width="16"
        height="20"
        rx="2"
        fill={shadowColor}
        transform="translate(1, 1)"
      />
      
      <Rect
        x="1"
        y="1"
        width="16"
        height="20"
        rx="2"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
      />
      
      <Path
        d="M13 1 L17 1 L17 5 L13 1 Z"
        fill={color}
        stroke={color}
        strokeWidth="0.5"
      />
      
      <Rect
        x="3"
        y="4"
        width="8"
        height="1"
        rx="0.5"
        fill="#FFFFFF"
      />
      <Rect
        x="3"
        y="6.5"
        width="10"
        height="0.8"
        rx="0.4"
        fill="#FFFFFF"
      />
      <Rect
        x="3"
        y="8.5"
        width="10"
        height="0.8"
        rx="0.4"
        fill="#FFFFFF"
      />
      <Rect
        x="3"
        y="10.5"
        width="10"
        height="0.8"
        rx="0.4"
        fill="#FFFFFF"
      />
    </Svg>
  );
};

export default DocumentIcon;