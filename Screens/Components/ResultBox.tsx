import React from 'react'
import { Text, View } from 'react-native';

interface IProps {
  blendedInterest: number | undefined,
  earnings: number
}

const ResultBox: React.FC<IProps> = ({blendedInterest, earnings}) => {
  return (
    <View>
      <Text style={{fontFamily: 'Raleway_700Bold', fontSize: 25, color: '#390164', textAlign: 'center', top: '65%'}}>Blended Rate: {blendedInterest}%</Text>
      <Text style={{fontFamily: 'Raleway_700Bold', fontSize: 25, color: '#390164', textAlign: 'center', top: '70%'}}>1-Year Earnings: ${earnings}</Text>
    </View>
  )
}

export default ResultBox;