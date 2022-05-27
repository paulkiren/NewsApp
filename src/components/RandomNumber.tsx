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
  const onItemPress = () => {
    console.log("Hello >> On click ", props);
    if (!props.isDsabled) {
      props.onSelect(props.id);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onItemPress()}>
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
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  text: {
    color: 'green',
    fontSize: 66,
    fontWeight: '300',
    // backgroundColor: 'orange',
  },
  isDisable: {
    opacity: 0.3,
  },
});
export default RandomNumber;
