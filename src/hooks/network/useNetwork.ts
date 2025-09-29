import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { httpClient } from '../../services/http/httpClient';

export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
      setConnectionType(state.type);
    });

    return unsubscribe;
  }, []);

  const clearCache = () => {
    httpClient.clearCache();
  };

  return {
    isOnline,
    connectionType,
    clearCache,
  };
};