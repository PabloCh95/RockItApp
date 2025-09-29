import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LoginCredentials, LoginResponse, User } from '../../types/auth.ts';

export class AuthService {
  private static  USER_TOKEN_KEY = 'userToken';
  private static  USER_DATA_KEY = 'userData';

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const validCredentials = {
      username: 'admin',
      password: '123456'
    };
    if (
      credentials.username === validCredentials.username &&
      credentials.password === validCredentials.password
    ) {
      const user: User = {
        id: '1',
        username: credentials.username,
        email: 'admin@rockit.com',
      };

      const token = 'mock-jwt-token-' + Date.now();

      await this.persistAuthData(user, token);

     return { user, token };
    }

    throw new Error('Credenciales inválidas');
  }

  async logout(): Promise<void> {
    await AsyncStorage.multiRemove([
      AuthService.USER_TOKEN_KEY,
      AuthService.USER_DATA_KEY
    ]);
  }

  async getStoredAuthData(): Promise<{ user: User; token: string } | null> {
    try {
      const [token, userData] = await AsyncStorage.multiGet([
        AuthService.USER_TOKEN_KEY,
        AuthService.USER_DATA_KEY
      ]);

      if (token[1] && userData[1]) {
        return {
          user: JSON.parse(userData[1]),
          token: token[1]
        };
      }

      return null;
    } catch (error) {
      console.error('Error getting stored auth data:', error);
      return null;
    }
  }

  private async persistAuthData(user: User, token: string): Promise<void> {
    await AsyncStorage.multiSet([
      [AuthService.USER_TOKEN_KEY, token],
      [AuthService.USER_DATA_KEY, JSON.stringify(user)]
    ]);
  }
}

export const authService = new AuthService();