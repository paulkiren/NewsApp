// game from Linkedin learning https://www.linkedin.com/learning/react-native-essential-training/configuring-eslint?autoSkip=true&autoplay=true&resume=false&u=2108001

import * as React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Text} from 'react-native-ui-lib';
import RandomNumber from '../components/RandomNumber';

export type ITargetSumGameProps = {
  randomNumberCount: number;
  onPlayAgain: any;
  initialSeconds: number;
};
export type ITargetSumGameState = {
  selectedIndex: Array<number>;
  remainingSeconds: number;
};
const IGameState = {
  playing: 'PLAYING',
  won: 'WON',
  lost: 'LOST',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  randomContainer: {
    flex: 1,
    backgroundColor: '#FEFEFE',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'orange',
    fontSize: 90,
    fontWeight: '100',
    textAlign: 'center',
  },
  statusText: {
    color: 'green',
    fontSize: 20,
    fontWeight: '100',
    textAlign: 'center',
  },
  STATUS_PLAYING: {
    backgroundColor: '#333',
  },

  STATUS_WON: {
    backgroundColor: 'green',
  },

  STATUS_LOST: {
    backgroundColor: 'red',
  },
});
class Game extends React.Component<ITargetSumGameProps, ITargetSumGameState> {
  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );
  targetValue = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((a, b) => a + b, 0);
  shuffledRandomNumbers = this.randomNumbers;
  inervalId: NodeJS.Timer | undefined;
  gameStatus: string = IGameState.playing;

  constructor(props: ITargetSumGameProps | Readonly<ITargetSumGameProps>) {
    super(props);
    this.state = {
      selectedIndex: [],
      remainingSeconds: this.props.initialSeconds,
    };
  }
  isNumberSelected = (numberIndex: number) =>
    this.state.selectedIndex.includes(numberIndex);
  calcSelectedNumberSum = () =>
    this.state.selectedIndex.reduce((a, b) => a + this.randomNumbers[b], 0);
  selectNumber = (numberIndex: number) => {
    this.setState({selectedIndex: [...this.state.selectedIndex, numberIndex]});
    console.log('Sum _ ', this.calcSelectedNumberSum());
  };

  componentWillUpdate(_nextProps: any, nextState: ITargetSumGameState) {
    if (
      nextState.selectedIndex !== this.state.selectedIndex ||
      nextState.remainingSeconds === 0
    ) {
      this.gameStatus = this.calcGameStatus(nextState) || '';
      if (this.gameStatus !== IGameState.playing) {
        clearInterval(this.inervalId);
      }
    }
    return null;
  }

  // componentDidUpdate(
  //   _prevProps: ITargetSumGameProps,
  //   nextState: ITargetSumGameState,
  //   snapshot: any,
  // ) {
  //   // If we have a snapshot value, we've just added new items.
  //   // Adjust scroll so these new items don't push the old ones out of view.
  //   // (snapshot here is the value returned from getSnapshotBeforeUpdate)
  //   // if (snapshot !== null) {
  //   //   // this.listRef.scrollTop =
  //   //   //   this.listRef.scrollHeight - snapshot;
  //   // }

  //   if (
  //     nextState.selectedIndex !== this.state.selectedIndex ||
  //     nextState.remainingSeconds === 0
  //   ) {
  //     this.gameStatus = this.calcGameStatus(nextState) || '';
  //     if (this.gameStatus !== 'PLAYING') {
  //       clearInterval(this.inervalId);
  //     }
  //   }
  // }

  componentDidMount() {
    this.inervalId = setInterval(() => {
      this.setState(
        prevState => {
          return {remainingSeconds: prevState.remainingSeconds - 1};
        },
        () => {
          if (this.state.remainingSeconds === 0) {
            clearInterval(this.inervalId);
          }
        },
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.inervalId);
  }

  calcGameStatus = (nextState: ITargetSumGameState) => {
    const sumSelected = nextState.selectedIndex.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);

    if (nextState.remainingSeconds === 0) {
      return IGameState.lost;
    }
    if (sumSelected < this.targetValue) {
      return IGameState.playing;
    }
    if (sumSelected === this.targetValue) {
      return IGameState.won;
    }
    if (sumSelected > this.targetValue) {
      return IGameState.lost;
    }
  };
  render() {
    const gameStatus = this.gameStatus;
    // const getClass =`STATUS_${gameStatus}`;
    return (
      <View style={styles.container}>
        <Text style={[styles.text, styles[`STATUS_${gameStatus}`]]}>
          {this.targetValue}
        </Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) => {
            return (
              <RandomNumber
                key={index}
                id={index}
                number={randomNumber}
                isDsabled={
                  this.isNumberSelected(index) || this.gameStatus !== 'PLAYING'
                }
                onSelect={this.selectNumber}
              />
            );
          })}
        </View>
        <Text style ={styles.statusText }>{this.state.remainingSeconds}</Text>
        <Text style={styles.statusText }>{this.gameStatus}</Text>
        {this.gameStatus !== 'PLAYING' && (
          <Button title="Play Again" onPress={this.props.onPlayAgain} />
        )}
        <Text style={styles.text}>{this.calcSelectedNumberSum()}</Text>
      </View>
    );
  }
}

export default Game;
