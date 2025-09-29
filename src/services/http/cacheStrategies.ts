export const cacheStrategies = {
 
    products: {
      enabled: true,
      ttl: 5 * 60 * 1000, 
      key: (url: string) => `products:${url}`,
    },
  
    feed: {
      enabled: true,
      ttl: 2 * 60 * 1000, 
      key: (url: string) => `feed:${url}`,
    },
  
    categories: {
      enabled: true,
      ttl: 60 * 60 * 1000, 
      key: (url: string) => `categories:${url}`,
    },
  
    noCache: {
      enabled: false,
      ttl: 0,
      key: (url: string) => url,
    },
  };