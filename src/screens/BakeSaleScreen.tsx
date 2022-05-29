// BakeSale from Linkedin learning https://www.linkedin.com/learning/react-native-essential-training/configuring-eslint?autoSkip=true&autoplay=true&resume=false&u=2108001

import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import BakeSale from '../components/BakeSaleDeal/BakeSale';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
});
type IBakeSaleScreenState = {
  BakeSaleId: number;
};
type IBakeSaleScreenProps = {
  BakeSaleId: number;
};
class BakeSaleScreen extends React.Component<IBakeSaleScreenProps, IBakeSaleScreenState> {

  constructor(props: IBakeSaleScreenProps | Readonly<IBakeSaleScreenProps>) {
    super(props)
    this.state = {
      BakeSaleId: 1,
    };
  }

  render() {
    return (
      <View style={styles.container}>
      <BakeSale/>
      </View>
    );
  }
}

export default BakeSaleScreen;
