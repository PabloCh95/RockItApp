import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { feedService } from '../../services/feedService/feedService';
import type { FeedState } from '../../types/feed';

const initialState: FeedState = {
  comments: [],
  isLoading: false,
  isRefreshing: false,
  error: null,
  hasMore: true,
  page: 1,
};

export const fetchComments = createAsyncThunk(
  'feed/fetchComments',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await feedService.getComments(page);
      return { ...response, page };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Error al cargar comentarios'
      );
    }
  }
);

export const refreshComments = createAsyncThunk(
  'feed/refreshComments',
  async (_, { rejectWithValue }) => {
    try {
      const comments = await feedService.refreshComments();
      return comments;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Error al actualizar comentarios'
      );
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetFeed: (state) => {
      state.comments = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        const { comments, hasMore, page } = action.payload;
        
        if (page === 1) {
          state.comments = comments;
        } else {
          state.comments = [...state.comments, ...comments];
        }
        
        state.hasMore = hasMore;
        state.page = page;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(refreshComments.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshComments.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.comments = action.payload;
        state.page = 1;
        state.hasMore = true;
      })
      .addCase(refreshComments.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetFeed } = feedSlice.actions;
export default feedSlice.reducer;