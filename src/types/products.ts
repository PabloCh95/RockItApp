export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
  
export interface ProductsState {
    products: Product[];
    isLoading: boolean;
    isRefreshing: boolean;
    error: string | null;
    hasMore: boolean;
    page: number;
    category: string;
}
  
export interface PurchaseData {
    productId: number;
    productTitle: string;
    price: number;
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
}
  
export interface PurchaseResponse {
    success: boolean;
    transactionId: string;
    message: string;
}