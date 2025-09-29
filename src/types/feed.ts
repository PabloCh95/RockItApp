export interface Comment {
    id: string;
    fullName: string;
    avatarUrl?: string;
    timestamp: string;
    comment: string;
  }
  
  export interface FeedState {
    comments: Comment[];
    isLoading: boolean;
    isRefreshing: boolean;
    error: string | null;
    hasMore: boolean;
    page: number;
  }
  
  export interface FeedResponse {
    comments: Comment[];
    hasMore: boolean;
    total: number;
  }