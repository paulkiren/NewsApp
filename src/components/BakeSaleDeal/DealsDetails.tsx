import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

const DealsDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Deals Details'}</Text>

      <Button title="Details"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width:'100%'
  },
  text: {
    color: 'green',
    fontSize: 60,
    fontWeight: '100',
    textAlign: 'center',
  },
});
export default DealsDetails;
