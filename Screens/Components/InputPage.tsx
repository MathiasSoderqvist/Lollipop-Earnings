import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import FetchRequest from '../../Services/ApiClient';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InputPage: React.FC = () => {
  const [input, onChangeInput] = useState<string>('100');
  const [coins, setCoins] = useState([]);
  const [daiRate, setDaiRate] = useState<number | undefined>(undefined);
  const [usdcRate, setUSDCRate] = useState<number | undefined>(undefined);
  const [usdtRate, setUSDTRate] = useState<number | undefined>(undefined);
  let [daiValue, setDaiValue] = useState<number[]>([100]);
  let [usdcValue, setUSDCValue] = useState<number[]>([0]);
  let [usdtValue, setUSDTValue] = useState<number[]>([0]);
  const [blendedInterest, setBlendedInterest] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updatingUSDC, setUpdatingUSDC] = useState(true);
  const [updatingUSDT, setUpdatingUSDT] = useState(true);
  const [updatingDAI, setUpdatingDAI] = useState(true);
  let total = daiValue[0] + usdcValue[0] + usdtValue[0];
  const [defaultValDAI, setDefaultValDAI] = useState([100]);
  const [defaultValUSDC, setDefaultValUSDC] = useState([0]);
  const [defaultValUSDT, setDefaultValUSDT] = useState([0]);

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
      setUSDCRate(rate);
    }
      
    
    const getUSDTRate: () => void = () => {
      let res = getRates('USDT');
      let rate = Math.round((res + Number.EPSILON) * 100) / 100;
      setUSDTRate(rate);
    }

    const getPercentageValue = (val: number) => {
      let amount = parseInt(input);
      let res = (val / 100) * amount;
      return res;
    }
    
    useEffect(() => {
      getDaiRate();
      getUSDCRate();
      getUSDTRate();
    }, [loading]);

    useEffect(() => {
      //re-render other sliders
      let amountOver = total - 100;
      
      if (usdtValue[0] > amountOver) {
        setUSDTValue([usdtValue[0] -= amountOver]);
      }
      else {
        setUSDCValue([100 - usdtValue[0]]);
        setUSDTValue([0]);
       } 
        setUpdatingDAI(true);
        setDefaultValUSDC(usdcValue);
        setDefaultValUSDT(usdcValue);
    }, [updatingDAI]);

    useEffect(() => {
      //re-render other sliders
      let amountOver = total - 100;
      if (total > 100) {
        if (daiValue[0] > amountOver) {
          setDaiValue([daiValue[0] -= amountOver]);
         } 
         else {
           setUSDTValue([100 - daiValue[0]]);
           setDaiValue([0]);
          } 
        }
        setUpdatingUSDC(true);
        setDefaultValDAI(daiValue);
        setDefaultValUSDT(usdtValue);
    }, [updatingUSDC]);

    useEffect(() => {
      //re-render other sliders
      let amountOver = total - 100;
      if (usdcValue[0] > amountOver) {
        setUSDCValue([usdcValue[0] -= amountOver]);
      }
      else {
        setDaiValue([100 - usdcValue[0]]);
        setUSDCValue([0]);
       }
        setUpdatingUSDT(true);
        setDefaultValDAI(daiValue);
        setDefaultValUSDC(usdcValue);
    }, [updatingUSDT]);

    const checkMaxSliderValue = (coin: string, val: number[]) => {
    switch (coin) {
      case 'USDC':
        setUSDCValue(val);
        setUpdatingUSDC(false);
        console.log("UPDAITNGGGGGG");
        break;
      case 'USDT':
          setUSDTValue(val);
          setUpdatingUSDT(false);
          break;
      case 'DAI':
          setDaiValue(val);
          setUpdatingDAI(false);
      break;
      default: console.log("ERROR: NUMBER NOT FOUND");
    }
  }

    console.log("START:", "TOTAL -", total)
    console.log(usdcValue[0], "%USDC slider percentage", daiValue[0])
    console.log(getPercentageValue(usdcValue[0]).toFixed(2), "$$ get percentValue")
    console.log(daiRate, "DAI", usdtRate, "USDT", usdcRate, "USDC")

  return (
    <View style={styles.container}>
      <Text style={styles.amount}>AMOUNT ($USD)</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeInput}
        value={input}
        placeholder="amount"
        keyboardType="numeric"
      />
      <Text>DAI ({daiRate}%) {daiValue[0].toFixed(2)}%:</Text>
      <MultiSlider 
      values={defaultValDAI}
      max={100}
      step={0.1}
      onValuesChangeFinish={(values) => checkMaxSliderValue('DAI', values)}
      />
      <Text>USDC ({usdcRate}%) {usdcValue[0].toFixed(2)}%:</Text>
      <MultiSlider 
      values={defaultValUSDC}
      max={100}
      step={0.1}
      onValuesChangeFinish={(values) => checkMaxSliderValue('USDC', values)}
      />
      <Text>USDT ({usdtRate}%) {usdtValue[0].toFixed(2)}%:</Text>
      <MultiSlider 
      values={defaultValUSDT}
      max={100}
      step={0.1}
      onValuesChangeFinish={(values) => checkMaxSliderValue('USDT', values)}
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

// useEffect(() => {
    //   checkMaxSliderValue('USDC')
    // }, [usdcValue]);

    // useEffect(() => {
    //   checkMaxSliderValue('DAI')
    // }, [daiValue]);

    // useEffect(() => {
    //   checkMaxSliderValue('USDT')
    // }, [usdtValue]);



