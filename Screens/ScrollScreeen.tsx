import React from 'react';
import InputPage from './Components/InputPage'
import WelcomePage from './Components/WelcomePage'
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