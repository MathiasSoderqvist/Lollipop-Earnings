import React from 'react';
import InputPage from './InputPage'
import WelcomePage from './WelcomePage'
import { ScrollView } from 'react-native';

const ScrollPages = () => {

  return (
    <ScrollView >
      <WelcomePage />
      <InputPage />
    </ScrollView>
  );
}

export default ScrollPages;