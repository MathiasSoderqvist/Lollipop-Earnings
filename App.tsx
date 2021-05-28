import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import ScrollComp from './Components/ScrollComp';
import FetchRequest from './Services/ApiClient';

const Stack = createStackNavigator();

const App: React.FC = () => {
  
  const [coins, setCoins] = useState([]);
  const [daiRate, setDaiRate] = useState<number | undefined>(undefined);
  const [usdcRate, setUsdcRate] = useState<number | undefined>(undefined);
  const [usdtRate, setUsdtRate] = useState<number | undefined>(undefined);
  const [avgInterest, setAvgInterest] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      FetchRequest()
      .then((json) => setCoins(json.cToken))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
 
    const getRates = (id: string) => {
      for (let i = 0; i < coins.length; i++) {
        let coin = coins[i]["underlying_symbol"];
        if (coin === id) {
          return coins[i]["supply_rate"]['value']*100;
        }
      }
    }

    const getDaiRate: () => void = () => {
      let res = getRates('DAI');
      let rate = Math.round((res + Number.EPSILON) * 100) / 100;
      setDaiRate(rate);
    }
    
     const getUSDCRate: () => void = () => {
      let res = getRates('USDC');
      let rate = Math.round((res + Number.EPSILON) * 100) / 100;
      setUsdcRate(rate);
    }
      
    
    const getUSDTRate: () => void = () => {
      let res = getRates('USDT');
      let rate = Math.round((res + Number.EPSILON) * 100) / 100;
      setUsdtRate(rate);
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