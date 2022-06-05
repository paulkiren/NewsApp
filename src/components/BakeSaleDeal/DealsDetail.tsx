import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  Linking,
} from 'react-native';
import {AnimatedImage} from 'react-native-ui-lib';
import ajax from '../../services/BakeSalesDealServices';

import {priceDisplay} from '../../utils/common';
type IDealsDetailProp = {
  initialDealData: any;
  onBcakPress: any;
};
type IDealsDetailState = {
  deal: any;
  imageIndex: number;
};
class DealsDetail extends React.Component<IDealsDetailProp, IDealsDetailState> {
  width: number ;
  constructor(props: IDealsDetailProp | Readonly<IDealsDetailProp>) {
    super(props);
    this.state = {
      deal: this.props.initialDealData,
      imageIndex: 0,
    };
    this.width = Dimensions.get('window').width;
  }
  openDealUrl = () => {
    Linking.openURL(this.state.deal.url);
  };

  imageXPos = new Animated.Value(0);
  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      this.imageXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      this.width = Dimensions.get('window').width;
      if (Math.abs(gs.dx) > this.width * 0.4) {
        const direction = Math.sign(gs.dx);
        // -1 for left, 1 for right
        Animated.timing(this.imageXPos, {
          toValue: direction * this.width,
          duration: 250,
          useNativeDriver: false,
        }).start(() => this.handleSwipe(-1 * direction));
      } else {
        Animated.spring(this.imageXPos, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  handleSwipe = (indexDirection: number) => {
    if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
      Animated.spring(this.imageXPos, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
      return;
    }
    this.setState(
      prevState => ({
        imageIndex: prevState.imageIndex + indexDirection,
      }),
      () => {
        // Next image animation
        this.imageXPos.setValue(indexDirection * this.width);
        Animated.spring(this.imageXPos, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      },
    );
  };

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

        {/* <AnimatedImage source={{uri: deal.media[0]}} style={styles.image} />
         */}
        <Animated.Image
          {...this.imagePanResponder.panHandlers}
          source={{uri: deal.media[this.state.imageIndex]}}
          style={[{left: this.imageXPos}, styles.image]}
        />
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
  back: {
    color: 'orange',
    fontSize: 18,
    padding: 5,
    minHeight: 25,
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
