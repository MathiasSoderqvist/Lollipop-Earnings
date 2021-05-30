import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import ScrollScreen from './Screens/ScrollScreeen';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/raleway';
import {
  Raleway_400Regular,
  Raleway_700Bold,
} from '@expo-google-fonts/raleway';

const Stack = createStackNavigator();

const App: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Raleway_400Regular
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
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