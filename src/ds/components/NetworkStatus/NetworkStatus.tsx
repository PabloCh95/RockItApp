import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../theme';
import { Text } from '../Text';

export const NetworkStatus: React.FC = () => {
 
  return (
    <View style={styles.container}>
      <Text variant="caption" color="inverse" align="center" style={styles.text}>
        Sin conexión a internet - Modo offline
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.neutral[900],
    justifyContent:'center',
    alignItems: 'center',
  },
  text: {
    padding: spacing[8],
  },
});

export default NetworkStatus;