import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import type { Product } from '../../../types/products';
import { Text } from '../Text';
import styles from './ProductCard.styles';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  style?: any;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  style
}) => {
  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  const handlePress = () => {
    onPress(product);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.content}>
        <Text 
          variant="body2" 
          style={styles.title}
          numberOfLines={2}
        >
          {product.title}
        </Text>
        
        <Text 
          variant="h6" 
          color="primary" 
          style={styles.price}
        >
          {formatPrice(product.price)}
        </Text>
        
        <View style={styles.rating}>
          <Text variant="caption" color="tertiary" style={styles.ratingText}>
            ⭐ {product.rating.rate} ({product.rating.count})
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};



export default ProductCard;