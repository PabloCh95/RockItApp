import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { NetworkStatus } from './ds/components/NetworkStatus/NetworkStatus';
import { useNetwork } from './hooks/network/useNetwork';
import Navigation from './navigation/navigation';
import { store } from './store/store';
function App() {
    const { isOnline } = useNetwork();

    
    return (
        <Provider store={store}>
          <SafeAreaProvider>
            {isOnline ? <Navigation /> : <NetworkStatus />}
            <StatusBar style="auto" />
          </SafeAreaProvider>
        </Provider>
      );
  
}

AppRegistry.registerComponent('main', () => App);
export default App;