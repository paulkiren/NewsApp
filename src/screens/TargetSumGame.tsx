// game from Linkedin learning https://www.linkedin.com/learning/react-native-essential-training/configuring-eslint?autoSkip=true&autoplay=true&resume=false&u=2108001

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-ui-lib';
import RandomNumber from '../components/RandomNumber';

export interface ITargetSum {
  randomNumeberCount: number;
}
const TargetSum = () => {
  const randomNumeberCount = 6;
  const randomNumbers = Array.from({length: 6}).map(
    item => 1 + Math.floor(10 * Math.random()),
  );
  const targetValue = randomNumbers
    .slice(1, randomNumeberCount - 2)
    .reduce((a, b) => a + b, 0);
  const [selectedIndex, setSelectedIndex] = React.useState<Array<number>>([]);
  const isNumberSelected = (numberIndex: number) =>
    selectedIndex.includes(numberIndex);

  const selectNumber = (numberIndex: number) =>
    setSelectedIndex([...selectedIndex, numberIndex]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{targetValue}</Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, index) => {
          return (
            <RandomNumber
              key={index}
              id={index}
              number={randomNumber}
              isDsabled={isNumberSelected(index)}
              onPress={selectNumber}
            />
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  randomContainer: {
    flex: 1,
    backgroundColor: '#FEFEFE',
  },
  text: {
    color: 'green',
    fontSize: 60,
    fontWeight: '100',
    textAlign: 'center',
  },
});

export default TargetSum;
