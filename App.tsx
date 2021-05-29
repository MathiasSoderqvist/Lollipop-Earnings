import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import ScrollScreen from './Screens/ScrollScreeen';

const Stack = createStackNavigator();

const App: React.FC = () => {
    
  return (
      <NavigationContainer>
      <Stack.Navigator
       screenOptions={{
        headerShown: false
        }}>
        <Stack.Screen
          name="Home"
          component={ScrollScreen}
        />
      </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;