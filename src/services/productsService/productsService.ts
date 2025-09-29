import type { Product, PurchaseData, PurchaseResponse } from '../../types/products';
import { cacheStrategies } from '../http/cacheStrategies';
import { CacheConfig, httpClient } from '../http/httpClient';
import { retryConfigs } from '../http/retryStrategies';


const BASE_URL = 'https://fakestoreapi.com';
const PRODUCTS_PER_PAGE = 10;

export class ProductsService {

  async getProducts(page: number = 1, category?: string): Promise<{
    products: Product[];
    hasMore: boolean;
    total: number;
  }> {
    try {
      let url = `${BASE_URL}/products`;
      
      if (category && category !== 'all') {
        url = `${BASE_URL}/products/category/${category}`;
      }

      const allProducts = await httpClient.get<Product[]>(
        url,
        { timeout: 8000 },
        cacheStrategies?.products as CacheConfig,
        retryConfigs.default
      );

      const offset = (page - 1) * PRODUCTS_PER_PAGE;
      const limit = PRODUCTS_PER_PAGE;
      const startIndex = offset;
      const endIndex = startIndex + limit;
      const products = allProducts.slice(startIndex, endIndex);
      const hasMore = endIndex < allProducts.length;

      return {
        products,
        hasMore,
        total: allProducts.length
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Error al cargar productos'
      );
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const categories = await httpClient.get<string[]>(
        `${BASE_URL}/products/categories`,
        { timeout: 5000 },
        cacheStrategies.categories as CacheConfig,
        retryConfigs.conservative
      );

      return ['all', ...categories];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return ['all']; 
    }
  }

  async purchaseProduct(purchaseData: PurchaseData): Promise<PurchaseResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (!this.validateCardData(purchaseData)) {
        throw new Error('Datos de tarjeta inválidos');
      }

      const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      return {
        success: true,
        transactionId,
        message: `Compra exitosa de ${purchaseData.productTitle} por $${purchaseData.price}`
      };
    } catch (error) {
      return {
        success: false,
        transactionId: '',
        message: error instanceof Error ? error.message : 'Error en la compra'
      };
    }
  }

  private validateCardData(data: PurchaseData): boolean {
    const { cardNumber, cardName, expiryDate, cvv } = data;
    
    if (!cardNumber || cardNumber.length < 16) return false;
    if (!cardName || cardName.trim().length < 2) return false;
    if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) return false;
    if (!cvv || cvv.length < 3) return false;
    
    return true;
  }
}

export const productsService = new ProductsService();