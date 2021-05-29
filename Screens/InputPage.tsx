import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import FetchRequest from '../Services/ApiClient';
import Slider from '@react-native-community/slider';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InputPage: React.FC = () => {
  const [value, onChangeValue] = useState<string | undefined>('');
  const [coins, setCoins] = useState([]);
  const [daiRate, setDaiRate] = useState<number | undefined>(undefined);
  const [usdcRate, setUsdcRate] = useState<number | undefined>(undefined);
  const [usdtRate, setUsdtRate] = useState<number | undefined>(undefined);
  const [blendedInterest, setBlendedInterest] = useState(0);
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
    }, [loading]);

    console.log(value, typeof(value), "CHANGE")

  console.log(daiRate, "DAI", usdtRate, "USDT", usdcRate, "USDC")

  return (
    <View style={styles.container}>
      <Text style={styles.amount}>AMOUNT ($USD)</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeValue}
        value={value}
        placeholder="amount"
        keyboardType="numeric"
      />
      <Text>DAI ({daiRate}%):</Text>
      <Slider 
      style={{width: 200, height: 40}}
      minimumValue={0}
      maximumValue={100}
      value={100}
      />
      <Text>USDC ({usdcRate}%):</Text>
      <Slider 
      style={{width: 200, height: 40}}
      minimumValue={0}
      maximumValue={100}
      />
      <Text>USDT ({usdtRate}%):</Text>
      <Slider 
      style={{width: 200, height: 40}}
      minimumValue={0}
      maximumValue={100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cbffdb',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
  },
  amount: {
    color: '#390164',
    fontWeight: '700',
    fontSize: 25,
  },
  input: {
    height: '8%',
    minWidth: '35%',
    margin: 12,
    borderRadius: 3,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 25,
    color: '#390164',
  }
});
 

export default InputPage;