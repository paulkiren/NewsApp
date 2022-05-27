// game from Linkedin learning https://www.linkedin.com/learning/react-native-essential-training/configuring-eslint?autoSkip=true&autoplay=true&resume=false&u=2108001

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-ui-lib';
import RandomNumber from '../components/RandomNumber';

export type ITargetSumProps = {
  randomNumeberCount: number;
};
export type ITargetSumState = {
  selectedIndex: Array<number>;
};
const randomNumeberCount = 7;

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
class TargetSum extends React.Component<ITargetSumProps, ITargetSumState> {
  // selectedIndex: Array<number> = [];

  randomNumbers = Array.from({length: randomNumeberCount}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );
  targetValue = this.randomNumbers
    .slice(1, randomNumeberCount - 2)
    .reduce((a, b) => a + b, 0);

  constructor(props: ITargetSumProps | Readonly<ITargetSumProps>) {
    super(props);
    this.state = {
      selectedIndex: [],
    };
  }
  isNumberSelected = (numberIndex: number) =>
    this.state.selectedIndex.includes(numberIndex);

  selectNumber = (numberIndex: number) =>
    this.setState({selectedIndex: [...this.state.selectedIndex, numberIndex]});
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.targetValue}</Text>
        <View style={styles.randomContainer}>
          {this.randomNumbers.map((randomNumber, index) => {
            return (
              <RandomNumber
                key={index}
                id={index}
                number={randomNumber}
                isDsabled={this.isNumberSelected(index)}
                onSelect={this.selectNumber}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

export default TargetSum;
