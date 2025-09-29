import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { DocumentIcon } from '../../assets/icons/DocumentsIcon';
import { StoreIcon } from '../../assets/icons/StoreIcon';
import { colors, spacing } from '../ds/theme';
import Feed from '../screens/feed';
import Products from '../screens/products';
export type BottomTabParamList = {
  Feed: undefined;
  Products: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();


export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        
        tabBarIcon: ({ color, size }) => (
          route.name === 'Feed' ? <DocumentIcon color={color} width={size} height={size} /> :  <StoreIcon color={color} width={size} height={size} /> 
          
          
        ),
        tabBarActiveTintColor: colors.primary[900],
        tabBarInactiveTintColor: colors.neutral[500],
        tabBarStyle: {
          backgroundColor: colors.neutral[0],
          borderTopColor: colors.neutral[200],
          borderTopWidth: 1,
          paddingBottom: spacing[2],
          paddingTop: spacing[2],
          height: 60,
        },
        
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: spacing[1],
        },
        
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.neutral[0],
          borderBottomColor: colors.neutral[200],
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: colors.neutral[900],
        },
        headerTintColor: colors.primary[500],
      })}
    >
      <Tab.Screen 
        name="Feed" 
        component={Feed}
       
      />
      <Tab.Screen 
        name="Products" 
        component={Products}
        
      />
    </Tab.Navigator>
  );
};
