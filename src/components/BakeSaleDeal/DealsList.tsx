import React from 'react';
import PropTypes from 'prop-types';
import {View, FlatList, StyleSheet} from 'react-native';
import DealsListItem from './DealsListItem';
type IDealsListProp = {
  deals: Array<any>;
  onItemPress: any;
};
class DealsList extends React.Component<IDealsListProp> {
  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.deals}
          renderItem={({item}) => (
            <DealsListItem deal={item} onPress={this.props.onItemPress} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  list: {
    backgroundColor: '#eee',
    width: '100%',
  },
  text: {
    color: 'green',
    fontSize: 60,
    fontWeight: '100',
    textAlign: 'center',
  },
});
export default DealsList;
