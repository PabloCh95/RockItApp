export interface CheckoutFormData {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  }
  
  export interface CheckoutValidationErrors {
    cardNumber?: string;
    cardName?: string;
    expiryDate?: string;
    cvv?: string;
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
    timestamp: string;
  }