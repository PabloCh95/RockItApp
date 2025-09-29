import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productsService } from '../../services/productsService/productsService';
import type { ProductsState, PurchaseData } from '../../types/products';

const initialState: ProductsState = {
  products: [],
  isLoading: false,
  isRefreshing: false,
  error: null,
  hasMore: true,
  page: 1,
  category: 'all',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ page, category }: { page: number; category?: string }, { rejectWithValue }) => {
    try {
      const response = await productsService.getProducts(page, category);
      return { ...response, page, category };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Error al cargar productos'
      );
    }
  }
);

export const refreshProducts = createAsyncThunk(
  'products/refreshProducts',
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await productsService.getProducts(1, category);
      return { ...response, category };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Error al actualizar productos'
      );
    }
  }
);

export const purchaseProduct = createAsyncThunk(
  'products/purchaseProduct',
  async (purchaseData: PurchaseData, { rejectWithValue }) => {
    try {
      const response = await productsService.purchaseProduct(purchaseData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Error en la compra'
      );
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      state.products = [];
      state.page = 1;
      state.hasMore = true;
    },
    resetProducts: (state) => {
      state.products = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        const { products, hasMore, page, category } = action.payload;
        
        if (page === 1) {
          state.products = products;
        } else {
          state.products = [...state.products, ...products];
        }
        
        state.hasMore = hasMore;
        state.page = page;
        state.category = category ?? '';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(refreshProducts.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshProducts.fulfilled, (state, action) => {
        state.isRefreshing = false;
        const { products, hasMore, category } = action.payload;
        state.products = products;
        state.hasMore = hasMore;
        state.page = 1;
        state.category = category;
      })
      .addCase(refreshProducts.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(purchaseProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(purchaseProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(purchaseProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCategory, resetProducts } = productsSlice.actions;
export default productsSlice.reducer;