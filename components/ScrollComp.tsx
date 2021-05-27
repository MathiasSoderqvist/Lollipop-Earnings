import React from 'react';
import InputPage from './InputPage'
import WelcomePage from './WelcomePage'
import { StyleSheet, ScrollView } from 'react-native';

const ScrollPages = () => {

  return (
    <ScrollView >
      <WelcomePage />
      <InputPage />
    </ScrollView>
  );
}

const styles = StyleSheet.create({

});
 

export default ScrollPages;