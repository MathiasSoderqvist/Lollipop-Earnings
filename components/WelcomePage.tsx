import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import Lollipop from '../assets/img/lollipop.svg'
import { TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const WelcomePage = () => {

  const downButtonHandler = () => {
    // ref.scrollToEnd({ animated: true });
    console.log("pressed");
  };

  return (
      <View style={styles.container}>
      <Text style={styles.header}>Lollipop</Text>
      <Lollipop style={styles.logo} />
      <Text style={styles.text}>Calculate your compound interest earnings</Text>
      <TouchableOpacity
          onPress={() => {
            downButtonHandler();
          }}
          style={styles.slider}
        >
          <AntDesign style={styles.arrow} name="downcircle" size={55} color="black" />
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
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#390164',
    fontWeight: '700',
    fontSize: 50,
  },
  text: {
    textAlign: 'center',
    color: '#390164',
    fontWeight: '700',
    fontSize: 25,
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