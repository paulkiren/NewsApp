import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';


 const HelloWorld = ()=> {
  return (
    <View style={styles.container}>
     
      <Text style={styles.text}>Hello, world!</Text>
  
      <Button title='Submit'></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%'
  },
  text: {
    color: 'green',
    fontSize: 60,
    fontWeight: '100',
    textAlign: 'center',
  },
});
export default HelloWorld;