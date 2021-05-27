import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import ScrollComp from './components/ScrollComp'
import InputPage from './components/InputPage'

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
      <Stack.Navigator
       screenOptions={{
        headerShown: false
        }}>
        <Stack.Screen
          name="Welcome"
          component={ScrollComp}
        />
      </Stack.Navigator>
      </NavigationContainer>
  );
}

