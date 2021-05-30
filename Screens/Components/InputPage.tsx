import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import FetchRequest from '../../Services/ApiClient';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Dai from '../../assets/img/dai.svg';
import USDC from '../../assets/img/usdc.svg';
import USDT from '../../assets/img/usdt.svg';
import ResultBox from './ResultBox';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InputPage: React.FC = () => {
  const [input, onChangeInput] = useState<string>('1000');
  const [coins, setCoins] = useState([]);
  const [daiRate, setDaiRate] = useState<number | undefined>(undefined);
  const [usdcRate, setUSDCRate] = useState<number | undefined>(undefined);
  const [usdtRate, setUSDTRate] = useState<number | undefined>(undefined);
  let [daiValue, setDaiValue] = useState<number[]>([100]);
  let [usdcValue, setUSDCValue] = useState<number[]>([0]);
  let [usdtValue, setUSDTValue] = useState<number[]>([0]);
  const [blendedInterest, setBlendedInterest] = useState<number | undefined>(0);
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updatingUSDC, setUpdatingUSDC] = useState(true);
  const [updatingUSDT, setUpdatingUSDT] = useState(true);
  const [updatingDAI, setUpdatingDAI] = useState(true);
  const [defaultValDAI, setDefaultValDAI] = useState([100]);
  const [defaultValUSDC, setDefaultValUSDC] = useState([0]);
  const [defaultValUSDT, setDefaultValUSDT] = useState([0]);
  let total = daiValue[0] + usdcValue[0] + usdtValue[0];

  useEffect(() => {
    FetchRequest()
    .then((json) => setCoins(json.cToken))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getDaiRate();
    getUSDCRate();
    getUSDTRate();
  }, [loading]);

  useEffect(() => {
    blendedRate();
  }, [usdcValue, usdtValue, daiValue, usdcRate, usdtRate, daiRate, input]);

  useEffect(() => {
    annualEarnings();
  }, [blendedInterest, input]);
  
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
      setDefaultValUSDT(usdtValue);
  }, [updatingDAI]);

  useEffect(() => {
    //re-render other sliders
    let amountOver = total - 100;
    if (total > 100) {
      if (daiValue[0] > amountOver) {
        setDaiValue([daiValue[0] -= amountOver]);
      } else {
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
    } else {
      setDaiValue([100 - usdcValue[0]]);
      setUSDCValue([0]);
     }
      setUpdatingUSDT(true);
      setDefaultValDAI(daiValue);
      setDefaultValUSDC(usdcValue);
  }, [updatingUSDT]);
 
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

  const checkMaxSliderValue = (coin: string, val: number[]) => {
    switch (coin) {
      case 'USDC':
        setUSDCValue(val);
        setUpdatingUSDC(false);
        break;
      case 'USDT':
        setUSDTValue(val);
        setUpdatingUSDT(false);
        break;
      case 'DAI':
        setDaiValue(val);
        setUpdatingDAI(false);
        break;
      default: console.log("ERROR: COIN NAME NOT FOUND");
    }
  }
  
  const blendedRate: () => void = () => {
    if (daiRate && usdcRate && usdtRate) {
      let dai = daiRate / 100;
      let usdc = usdcRate / 100;
      let usdt = usdtRate / 100;
      let daiAmount = parseInt(getPercentageValue(daiValue[0]).toFixed(2)) * dai;
      let usdcAmount = parseInt(getPercentageValue(usdcValue[0]).toFixed(2)) * usdc;
      let usdtAmount = parseInt(getPercentageValue(usdtValue[0]).toFixed(2)) * usdt;
      
      let blended = ((daiAmount + usdcAmount + usdtAmount) / parseInt(input))*100;
      
      let blendedFixed = Math.round((blended + Number.EPSILON) * 100) / 100;

      setBlendedInterest(blendedFixed);
    }
  }

  const annualEarnings = () => {
    if (blendedInterest) {
      let earned = blendedInterest * parseInt(input);
      let rounded = Math.round((earned + Number.EPSILON) * 100) / 100;
      setEarnings(rounded/ 100);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.rates}>
        <Text style={{
          fontFamily: 'Raleway_700Bold', 
          fontSize: 25, color: '#390164', 
          textAlign: 'center', 
          bottom: '10%'}}>
            AMOUNT ($USD)
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeInput}
          value={input}
          placeholder="amount"
          keyboardType="numeric"
        />
        <Text style={{
          fontFamily: 'Raleway_400Regular', 
          fontSize: 18, 
          color: '#390164', 
          textAlign: 'center'
        }}>
          <Dai /> DAI ({daiRate}% APY)        {daiValue[0].toFixed(2)}%
        </Text>
        <MultiSlider 
          values={defaultValDAI}
          max={100}
          step={0.1}
          onValuesChangeFinish={(values) => checkMaxSliderValue('DAI', values)}
        />
        <Text style={{
          fontFamily: 'Raleway_400Regular', 
          fontSize: 18, 
          color: '#390164', 
          textAlign: 'center'
        }}> 
          <USDC /> USDC ({usdcRate}% APY)        {usdcValue[0].toFixed(2)}%
        </Text>
        <MultiSlider 
        values={defaultValUSDC}
        max={100}
        step={0.1}
        onValuesChangeFinish={(values) => checkMaxSliderValue('USDC', values)}
        />
        <Text style={{
          fontFamily: 'Raleway_400Regular', 
          fontSize: 18, 
          color: '#390164', 
          textAlign: 'center'
          }}> 
          <USDT /> USDT ({usdtRate}% APY)        {usdtValue[0].toFixed(2)}%
          </Text>
        <MultiSlider 
          values={defaultValUSDT}
          max={100}
          step={0.1}
          onValuesChangeFinish={(values) => checkMaxSliderValue('USDT', values)}
      />
      </View>
      <View style={styles.resultbox}>
        <ResultBox 
          blendedInterest={blendedInterest}
          earnings={earnings}
        />
      </View>
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
  rates: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '5%'
  },
  input: {
    height: '8%',
    minWidth: '35%',
    margin: 12,
    bottom: '10%',
    borderBottomWidth : 1.0,
    borderBottomColor: '#390164',
    textAlign: 'center',
    fontSize: 25,
    color: '#390164',
  },
  resultbox: {
    flex: 1,
    width: '90%',
    minHeight: 150,
    position: 'absolute',
    bottom: '10%',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: "rgba(139, 209, 211, 0.3)",
  },
});
 
export default InputPage;

