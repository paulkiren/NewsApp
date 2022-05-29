// game from Linkedin learning https://www.linkedin.com/learning/react-native-essential-training/configuring-eslint?autoSkip=true&autoplay=true&resume=false&u=2108001

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import Game from '../components/Game';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
});
type ITargetSumState = {
  gameId: number;
};
type ITargetSumProps = {
  gameId: number;
};
class TargetSumGameScreen extends React.Component<ITargetSumProps, ITargetSumState> {
  // state = {
  //   gameId: 1,
  // };
  constructor(props: ITargetSumProps | Readonly<ITargetSumProps>) {
    super(props)
    this.state = {
      gameId: 1,
    };
  }
  resetGame = () => {
    this.setState(prevState => {
      return {gameId: prevState.gameId + 1};
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Game
          key={this.state?.gameId|1}
          onPlayAgain={this.resetGame}
          randomNumberCount={6}
          initialSeconds={10}
        />
      </View>
    );
  }
}

export default TargetSumGameScreen;
