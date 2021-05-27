import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import Lollipop from '../assets/img/lollipop.svg'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lollipop</Text>
      <Lollipop style={styles.logo} />
      <Text style={styles.text}>Calculate your compound interest earnings</Text>
      <AntDesign style={styles.arrow} name="downcircle" size={55} color="black" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cdf5db',
    alignItems: 'center',
    justifyContent: 'center',
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
    top: '25%',
    color: '#390164'
  },
  logo: {
    marginTop: '10%',
    marginBottom: '10%',
  },
});