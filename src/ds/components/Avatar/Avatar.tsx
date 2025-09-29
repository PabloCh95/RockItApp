import React from 'react';
import { Image, Text, View } from 'react-native';

import styles from './Avatar.styles';


interface AvatarProps {
  uri?: string;
  name: string;
  size?: number;
  style?: any;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 40,
  style
}) => {
  const getInitials = (fullName: string): string => {
    return fullName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <View style={[styles.container, avatarStyle, style]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, avatarStyle]}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.initialsContainer, avatarStyle]}>
          <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
            {getInitials(name)}
          </Text>
        </View>
      )}
    </View>
  );
};



export default Avatar;