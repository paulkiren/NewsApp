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
      <TouchableOpacity onPress={() => onItemPress()}>
        <Text style={[styles.text, props.isDsabled && styles.isDisable]}>
          {props.number}
        </Text>
        {/* <Text>{props.id}</Text> */}
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'green',
    fontSize: 66,
    fontWeight: '300',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    textAlign: 'center',
    borderColor:'grey',
    borderWidth:1,
    borderRadius:5,
    backgroundColor: 'lightorange',
  },
  isDisable: {
    opacity: 0.3,
    color:'blue',
    backgroundColor: 'grey',
  },
});
export default RandomNumber;
