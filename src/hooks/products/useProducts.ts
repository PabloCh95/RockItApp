import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, fetchProducts, purchaseProduct, refreshProducts, setCategory } from '../../store/slices/productsSlice';
import { AppDispatch, RootState } from '../../store/store';
import type { Product, PurchaseData } from '../../types/products';

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productsState = useSelector((state: RootState) => state.products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleProductPress = (product: Product) => {
        setSelectedProduct(product);
        setShowCheckout(true);
    };

  const handlePurchase = async (purchaseData: PurchaseData) => {
        try {
        await dispatch(purchaseProduct(purchaseData));
        setShowCheckout(false);
        setSelectedProduct(null);
        } catch (error) {
        throw error;
        }
    };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedProduct(null);
  };


  
  return {
    ...productsState,
    
    loadProducts: (page: number = 1, category?: string) => 
      dispatch(fetchProducts({ page, category })),
    handleRefresh: (category?: string) => 
      dispatch(refreshProducts(category || productsState.category)),
    handlePurchase,
    changeCategory: (category: string) => 
      dispatch(setCategory(category)),
    clearProductsError: () => 
      dispatch(clearError()),
    loadMore: () => {
      if (!productsState.isLoading && productsState.hasMore) {
        dispatch(fetchProducts({ 
          page: productsState.page + 1, 
          category: productsState.category 
        }));
      }
    },
    handleProductPress,
    handleCloseCheckout,
    selectedProduct,
    showCheckout,
  };
};