import NetInfo from '@react-native-community/netinfo';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface CacheConfig {
  enabled: boolean;
  ttl: number; 
  key: string | ((url: string) => string);
}

export interface CacheConfigWithKey {
  enabled: boolean;
  ttl: number; 
  key: (url: string) => string;
}

export interface RetryConfig {
  retries: number;
  retryDelay: number;
  retryCondition: (error: any) => boolean;
}

export class HttpClient {
  private axiosInstance: AxiosInstance;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();
  private isOnline: boolean = true;

  constructor(baseURL: string = '') {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
    this.setupNetworkListener();
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
       
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
       return response;
      },
      (error) => {
        console.error('❌ Response Error:', error.response?.status, error.message);
        return Promise.reject(error);
      }
    );
  }

  private setupNetworkListener(): void {
    NetInfo.addEventListener(state => {
      this.isOnline = state.isConnected ?? false;
    });
  }

  async get<T>(
    url: string, 
    config?: AxiosRequestConfig,
    cacheConfig?: CacheConfig,
    retryConfig?: RetryConfig
  ): Promise<T> {
    const cacheKey = cacheConfig?.key || url;
    
    if (cacheConfig?.enabled && this.isOnline) {
      const cachedData = this.getFromCache<T>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    if (!this.isOnline) {
      const cachedData = this.getFromCache<T>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
      throw new Error('No hay conexión a internet y no hay datos en cache');
    }

    try {
      const response = await this.axiosInstance.get<T>(url, config);
      
      if (cacheConfig?.enabled) {
        this.setCache(typeof cacheKey === 'function' ? cacheKey(url) : cacheKey, response.data, cacheConfig.ttl);
      }

      return response.data;
    } catch (error) {
      if (retryConfig && this.shouldRetry(error, retryConfig)) {
        return this.retryRequest(() => this.axiosInstance.get<T>(url, config), retryConfig);
      }
      throw error;
    }
  }

  async post<T>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig,
    retryConfig?: RetryConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (retryConfig && this.shouldRetry(error, retryConfig)) {
        return this.retryRequest(() => this.axiosInstance.post<T>(url, data, config), retryConfig);
      }
      throw error;
    }
  }

  async put<T>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig,
    retryConfig?: RetryConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      if (retryConfig && this.shouldRetry(error, retryConfig)) {
        return this.retryRequest(() => this.axiosInstance.put<T>(url, data, config), retryConfig);
      }
      throw error;
    }
  }

  async delete<T>(
    url: string, 
    config?: AxiosRequestConfig,
    retryConfig?: RetryConfig
  ): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(url, config);
      return response.data;
    } catch (error) {
      if (retryConfig && this.shouldRetry(error, retryConfig)) {
        return this.retryRequest(() => this.axiosInstance.delete<T>(url, config), retryConfig);
      }
      throw error;
    }
  }

  private getFromCache<T>(key: string | ((url: string) => string)): T | null {
    const cached = this.cache.get(typeof key === 'function' ? key('') : key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > cached.ttl) {
      this.cache.delete(typeof key === 'function' ? key('') : key);
      return null;
    }

    return cached.data;
  }

  private setCache<T>(key: string, data: T, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  private shouldRetry(error: any, retryConfig: RetryConfig): boolean {
    if (!retryConfig.retryCondition) return false;
    return retryConfig.retryCondition(error);
  }

  private async retryRequest<T>(
    requestFn: () => Promise<AxiosResponse<T>>, 
    retryConfig: RetryConfig
  ): Promise<T> {
    let lastError: any;
    
    for (let attempt = 1; attempt <= retryConfig.retries; attempt++) {
      try {
        await this.delay(retryConfig.retryDelay * attempt);
        const response = await requestFn();
        return response.data;
      } catch (error) {
        lastError = error;
        if (attempt === retryConfig.retries) {
          break;
        }
      }
    }
    
    throw lastError;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  clearCache(): void {
    this.cache.clear();
  }

  isNetworkAvailable(): boolean {
    return this.isOnline;
  }
}

export const httpClient = new HttpClient();