 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useAuth } from '../hooks/auth/useAuth';
import LoginScreen from '../screens/auth/LoginScreen';
import BottomTabNavigation from './BottomTabNavigation';


const Stack = createStackNavigator();

export default function Navigation() {
    const { isAuthenticated, isLoading, checkAuth } = useAuth();
    
    useEffect(() => {
        checkAuth();
      }, [checkAuth]);
    
      if (isLoading) {
        return null;
      }
    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthenticated ? (
                     <Stack.Screen 
                     name="BottomTabNavigation" 
                     options={{
                        headerShown: false,
                     }}
                     component={BottomTabNavigation} 
                   />
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}