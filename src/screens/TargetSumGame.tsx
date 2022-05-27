// game from Linkedin learning https://www.linkedin.com/learning/react-native-essential-training/configuring-eslint?autoSkip=true&autoplay=true&resume=false&u=2108001

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-ui-lib';
import RandomNumber from '../components/RandomNumber';

const TargetSum = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{42}</Text>
      <RandomNumber />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  text: {
    color: 'green',
    fontSize: 60,
    fontWeight: '100',
    textAlign: 'center',
  },
});

export default TargetSum;
