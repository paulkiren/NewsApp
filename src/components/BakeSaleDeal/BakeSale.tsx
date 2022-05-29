import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import ajax from '../../services/BakeSalesDealServices';
import DealsList from './DealsList';
import DealsDetail from './DealsDetail';
import SearchBar from './SearchBar';
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
  dealsFromSearch: Array<IDeals>;
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
      dealsFromSearch: [],
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
  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null,
    });
  };
  searchDeals = async (searchTerm: string) => {
    let dealsFromSearch = [];
    if (searchTerm) {
      console.log('Search Term', searchTerm);
      dealsFromSearch = await ajax.fetchDealSearchResults(searchTerm);
      console.log('dealsFromSearch ::::: ', dealsFromSearch);
    }
    this.setState({dealsFromSearch});
  };
  render() {
    if (this.state.currentDealId) {
      return (
        <View style={styles.main}>
          <DealsDetail
            initialDealData={this.currentDeal()}
            onBcakPress={this.unsetCurrentDeal}
          />
        </View>
      );
    }
    const dealsToDisplay =
      this.state.dealsFromSearch.length > 0
        ? this.state.dealsFromSearch
        : this.state.deals;

    if (dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals} />
          <DealsList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
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
  main: {
    marginTop: 30,
  },
  header: {
    fontSize: 40,
  },
});

export default BakeSale;
