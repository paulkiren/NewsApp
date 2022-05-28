// game from Linkedin learning https://www.linkedin.com/learning/react-native-essential-training/configuring-eslint?autoSkip=true&autoplay=true&resume=false&u=2108001

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-ui-lib';
import RandomNumber from '../components/RandomNumber';

export type ITargetSumGameProps = {
  randomNumberCount: number;
  onPlayAgain:any;
  initialSeconds:number;
};
export type ITargetSumGameState = {
  selectedIndex: Array<number>;
  remainingSeconds:number;
  
};
const  IGameState = {
  playing :'PLAYING',
  won :'WON',
  lost : 'LOST',
}


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
});
class Game extends React.Component<ITargetSumGameProps, ITargetSumGameState> {
  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );
  targetValue = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((a, b) => a + b, 0);
  shuffledRandomNumbers= this.randomNumbers;

  constructor(props: ITargetSumGameProps | Readonly<ITargetSumGameProps>) {
    super(props);
    this.state = {
      selectedIndex: [],
      remainingSeconds:10
    };
  }
  gameStatus = IGameState.playing;
  isNumberSelected = (numberIndex: number) =>
    this.state.selectedIndex.includes(numberIndex);
  calcSelectedNumberSum = () =>
    this.state.selectedIndex.reduce((a, b) => a + this.randomNumbers[b], 0);
  selectNumber = (numberIndex: number) => {
    this.setState({selectedIndex: [...this.state.selectedIndex, numberIndex]});
    console.log('Sum _ ', this.calcSelectedNumberSum());
  };

  getSnapshotBeforeUpdate(_nextProps: any, nextState: ITargetSumState){
    if (
      nextState.selectedIndex !== this.state.selectedIndex ||
      nextState.remainingSeconds === 0
    ) {
      this.gameStatus = this.calcGameStatus(nextState) ||'';
      if (this.gameStatus !== IGameState.playing) {
        // clearInterval(this.inervalId);
      }
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      // this.listRef.scrollTop =
      //   this.listRef.scrollHeight - snapshot;
    }
  }

  calcGameStatus = (nextState: ITargetSumGameState)=> {
    const sumSelected = nextState.selectedIndex.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);
    if (nextState.remainingSeconds === 0) {
      return  IGameState.lost;
    }
    if (sumSelected < this.targetValue) {
      return  IGameState.playing;
    }
    if (sumSelected === this.targetValue) {
      return  IGameState.won;
    }
    if (sumSelected > this.targetValue) {
      return IGameState.lost;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.targetValue}</Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) => {
            return (
              <RandomNumber
                key={index}
                id={index}
                number={randomNumber}
                isDsabled={this.isNumberSelected(index) || this.gameStatus !== 'PLAYING'}
                onSelect={this.selectNumber}
              />
            );
          })}
        </View>
        <Text style={styles.statusText}>{this.gameStatus}</Text>
        <Text style={styles.text}>{this.calcSelectedNumberSum()}</Text>
      </View>
    );
  }
}

export default Game;
