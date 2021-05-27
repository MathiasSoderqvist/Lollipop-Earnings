import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
  
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InputPage: React.FC = () => {
  
  const [number, onChangeNumber] = React.useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.amount}>AMOUNT ($USD)</Text>
      <TextInput
        style={styles.input}
        onChangeNumber={onChangeNumber}
        value={number}
        placeholder="amount"
        keyboardType="numeric"
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