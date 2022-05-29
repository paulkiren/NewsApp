import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import ajax from '../../services/BakeSalesDealServices';
import DealsList from './DealsList';
import DealsDetail from './DealsDetail';
export interface Cause {
  name: string;
}
export interface Charity {
  name: string;
  description?: any;
  website?: any;
}

export interface User {
  avatar: string;
  name: string;
}
export interface IDeals {
  key: string;
  dealType: string;
  title: string;
  price: number;
  makerPercentage: number;
  cause: Cause;
  description: string;
  tags: string;
  charity: Charity;
  charityName?: any;
  charityDescription?: any;
  charityWebsite?: any;
  availableQuantity: number;
  geoLocation?: any;
  url: string;
  user: User;
  media: string[];
}
type IDealsState = {
  deals: Array<IDeals>;
  currentDealId: null;
};
type IDealsProps = {
  currentDealId: null;
};
class BakeSale extends React.Component<IDealsProps, IDealsState> {
  constructor(props: IDealsProps | Readonly<IDealsProps>) {
    super(props);
    this.state = {
      deals: [],
      currentDealId: null,
    };
  }
  async componentDidMount() {
    const deals = await ajax.getInitialDealsFromApi();
    console.log('deals', deals);
    this.setState({deals});
  }
  setCurrentDeal = (dealId: any) => {
    this.setState({
      currentDealId: dealId,
    });
  };
  currentDeal = () => {
    return this.state.deals.find(deal => deal.key === this.state.currentDealId);
  };
  onBackPress = () => {
    this.setState({
      currentDealId: null,
    });
  }
  render() {
    if (this.state.currentDealId) {
      return <DealsDetail  initialDealData={this.currentDeal()} onBcakPress={this.onBackPress} />;
    }
    if (this.state.deals.length > 0) {
      return (
        <DealsList deals={this.state.deals} onItemPress={this.setCurrentDeal} />
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Bakesale</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  },
});

export default BakeSale;

// import React from 'react';
// import {StyleSheet, Text, View, Button} from 'react-native';
// import DealsDetails from './DealsDetails';
// import DealsList from './DealsList';

//  const BakeSale = ()=> {
//   return (
//     <View style={styles.container}>

//       <Text style={styles.text}>Deals</Text>
//       <DealsList/>
//       <DealsDetails/>

//       <Button title='Submit'></Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height:'100%'
//   },
//   text: {
//     color: 'green',
//     fontSize: 60,
//     fontWeight: '100',
//     textAlign: 'center',
//   },
// });
// export default BakeSale;
