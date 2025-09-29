import React, { useEffect } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { CheckoutModal, ProductCard, Text } from '../../ds';
import { useProducts } from '../../hooks/products/useProducts';
import type { Product } from '../../types/products';
import styles from './Products.styles';

export const ProductsScreen: React.FC = () => {
  const {
    products,
    isLoading,
    isRefreshing,
    error,
    hasMore,
    loadProducts,
    handleRefresh,
    loadMore,
    clearProductsError,
    handleProductPress,
    handlePurchase,
    handleCloseCheckout,
    selectedProduct,
    showCheckout,
  } = useProducts();

  
  useEffect(() => {
    if (products.length === 0) {
      loadProducts(1);
    }
  }, []);

  

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard 
      product={item} 
      onPress={handleProductPress}
      style={styles.productCard}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text variant="h3" align="center" style={styles.emptyTitle}>
        No hay productos
      </Text>
      <Text variant="body2" color="secondary" align="center">
        Los productos aparecerán aquí cuando estén disponibles
      </Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text variant="body2" color="error" align="center" style={styles.errorText}>
        {error}
      </Text>
    </View>
  );

  if (error && products.length === 0) {
    return (
      <View style={styles.container}>
        {renderError()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={!isLoading ? renderEmpty : null}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => handleRefresh()}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <CheckoutModal
        visible={showCheckout}
        product={selectedProduct}
        onClose={handleCloseCheckout}
        onPurchase={handlePurchase}
      />
    </View>
  );
};



export default ProductsScreen;