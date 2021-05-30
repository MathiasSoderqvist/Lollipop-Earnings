import React, { useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import Lollipop from '../../assets/img/lollipop.svg'
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WelcomePage = () => {
  const scrollRef = useRef();


  const downButtonHandler = () => {
    console.log("pressed");
  };

  return (
      <View style={styles.container}>
      <Text style={{ fontFamily: 'Raleway_700Bold', fontSize: 50, color: '#390164'}}>Lollipop</Text>
      <Lollipop style={styles.logo} />
      <Text style={{fontFamily: 'Raleway_400Regular', fontSize: 25, color: '#390164', textAlign: 'center'}}>Calculate your compound interest earnings</Text>
      <TouchableOpacity
          onPress={() => {
            downButtonHandler();
          }}
          style={styles.slider}
        >
          <AntDesign style={styles.arrow} name="arrowdown" size={55} color="black" />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cdf5db',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
  },
  arrow: {
    color: '#390164',
  },
  slider: {
    top: '20%',
  },
  logo: {
    marginTop: '10%',
    marginBottom: '10%',
  },
});

export default WelcomePage;