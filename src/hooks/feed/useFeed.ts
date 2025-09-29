import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, fetchComments, refreshComments } from '../../store/slices/feedSlices';
import { AppDispatch, RootState } from '../../store/store';

export const useFeed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const feedState = useSelector((state: RootState) => state.feed);

  const loadComments = (page: number = 1): void => {
    dispatch(fetchComments(page));
  };

  const handleRefresh = () => {
    dispatch(refreshComments());
  };

  const clearFeedError = () => {
    dispatch(clearError());
  };

  const loadMore = () => {
    if (!feedState.isLoading && feedState.hasMore) {
      loadComments(feedState.page + 1);
    }
  };
  useEffect(() => {
    if (feedState.comments.length === 0) {
      loadComments(1);
    }
  }, [loadComments, feedState.comments.length]);

  return {
      comments: feedState.comments,
      isLoading: feedState.isLoading,
      isRefreshing: feedState.isRefreshing,
      error: feedState.error,
      hasMore: feedState.hasMore,
      
      loadComments,
      handleRefresh,
      loadMore,
      clearFeedError,
  };
};