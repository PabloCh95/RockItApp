import feedData from '../../../assets/feed.json';
import type { Comment, FeedResponse } from '../../types/feed';

export class FeedService {
  

   async getComments(page: number = 1, limit: number = 10): Promise<FeedResponse> {

    await new Promise(resolve => setTimeout(resolve, 1000));

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const comments = feedData.slice(startIndex, endIndex);
    const hasMore = endIndex < feedData.length;

    return {
      comments,
      hasMore,
      total: feedData.length
    };
  }

  async refreshComments(): Promise<Comment[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return feedData.slice(0, 5); 
  }
}

export const feedService = new FeedService();