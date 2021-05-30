import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

interface IProps {
  blendedInterest: number | undefined,
  earnings: number
}

const ResultBox: React.FC<IProps> = ({blendedInterest, earnings}) => {
  return (
    <View style={styles.infobox}>
      <Text style={{fontFamily: 'Raleway_700Bold', fontSize: 25, color: '#390164', textAlign: 'center', top: '65%'}}>BLENDED RATE: {blendedInterest}%</Text>
      <Text style={{fontFamily: 'Raleway_700Bold', fontSize: 25, color: '#390164', textAlign: 'center', top: '70%'}}>APY: ${earnings}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
infobox: {
  
}
})

export default ResultBox;