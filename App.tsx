import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import ScrollComp from './Components/ScrollComp';
import FetchRequest from './Services/ApiClient';


const Stack = createStackNavigator();

const App: React.FC = () => {
  
  const [coins, setCoins] = useState([]);
  const [daiRate, setDaiRate] = useState(0);
  const [usdcRate, setUsdcRate] = useState(0);
  const [usdtRate, setUsdtRate] = useState(0);
  const [avgInterest, setAvgInterest] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      FetchRequest()
      .then((json) => setCoins(json.cToken))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

    const getDaiRate: () => void = () => {
      for (let i = 0; i < coins.length; i++) {
        let coin = coins[i]["underlying_symbol"];
        if (coin === 'DAI') {
          setDaiRate(coins[i]["supply_rate"]['value']*100);
        }
     }
    }
     const getUSDCRate: () => void = () => {
      for (let i = 0; i < coins.length; i++) {
        let coin = coins[i]["underlying_symbol"];
        if (coin === 'USDC') {
          setUsdcRate(coins[i]["supply_rate"]['value']*100);
        }
      }
    }
    const getUSDTRate: () => void = () => {
      for (let i = 0; i < coins.length; i++) {
        let coin = coins[i]["underlying_symbol"];
        if (coin === 'USDT') {
          setUsdtRate(coins[i]["supply_rate"]['value']*100);
        }
    }
  }
    
  useEffect(() => {
    getDaiRate();
    getUSDCRate();
    getUSDTRate();
  }, [loading])

  console.log(daiRate, "DAI", usdtRate, "USDT", usdcRate, "USDC")
 
    
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

export default App