import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export interface IRandomNumber {
  key: number;
  id: number;
  number: number;
  isDsabled: boolean;
  onSelect: any;
}

const RandomNumber = (props: IRandomNumber) => {
  console.log("Hello >> ", props);
  const onItemPress = () => {
    if (!props.isDsabled) {
      props.onSelect(props.id);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>onItemPress()}>
        <Text style={[styles.text, props.isDsabled && styles.isDisable]}>
          {props.number}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    height: '100%',
  },
  text: {
    color: 'green',
    fontSize: 60,
    fontWeight: '100',
    textAlign: 'center',
  },
  isDisable: {
    opacity: 0.3,
  },
});
export default RandomNumber;
// function onPress(id: number) {
//   throw new Error('Function not implemented.');
// }
