import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import ajax from '../../services/BakeSalesDealServices';

import {priceDisplay} from '../../utils/common';
type IDealsDetailProp = {
  initialDealData: any;
  onBcakPress:any;
};
type IDealsDetailState = {
  deal: any;
};
class DealsDetail extends React.Component<IDealsDetailProp, IDealsDetailState> {
  constructor(props: IDealsDetailProp | Readonly<IDealsDetailProp>) {
    super(props);
    this.state = {
      deal: this.props.initialDealData,
    };
  }

  async componentDidMount() {
    const fullDeal = await ajax.getDealDetailFromApi(this.state.deal.key);
    this.setState({
      deal: fullDeal,
    });
  }
  
  render() {
    const {deal} = this.state;
    return (
      <View style={styles.deal}>
        <TouchableOpacity onPress={this.props.onBcakPress}>
          <Text style={styles.back}>{'< Back'}</Text>
        </TouchableOpacity>
        <Image source={{uri: deal.media[0]}} style={styles.image} />
        <View style={styles.detail}>
          <View>
            <Text style={styles.title}>{deal.title}</Text>
          </View>
          <View style={styles.footer}>
            <View style={styles.info}>
              <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
              <Text style={styles.cause}>{deal.cause.name}</Text>
            </View>
            {deal.user && (
              <View style={styles.user}>
                <Image source={{uri: deal.user.avatar}} style={styles.avatar} />
                <Text>{deal.user.name}</Text>
              </View>
            )}
          </View>
          <View style={styles.description}>
            <Text>{deal.description}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  back:{
    color:'orange',
    fontSize:18,
    padding:5,
    minHeight:25,

  },
  deal: {
    marginHorizontal: 12,
    marginTop: 12,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  detail: {
    borderColor: '#bbb',
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(237, 149, 45, 0.4)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  info: {
    alignItems: 'center',
  },
  user: {
    alignItems: 'center',
  },
  cause: {
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  description: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'dotted',
    margin: 10,
    padding: 10,
  },
});

export default DealsDetail;
