import * as React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import debounce from 'lodash.debounce';
type searchProps = {
  searchDeals: any;
};
type searchState = {
  searchTerm: string;
};
class SearchBar extends React.Component<searchProps, searchState> {
  constructor(props: searchProps | Readonly<searchProps>) {
    super(props);
    this.state = {searchTerm: ''};
  }
  debouncedSearchDeals = debounce(this.props.searchDeals, 300);
  handleChange = (searchTerm: any) => {
    this.setState({searchTerm}, () => {
      this.debouncedSearchDeals(this.state.searchTerm);
    });
  };
  render() {
    return (
      <TextInput
        style={styles.input}
        placeholder="Search Deals"
        onTextInput={this.handleChange}
      />
    );
  }
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
    borderColor:'yellow',
    borderWidth:1,
    backgroundColor:'orange',
  },
});
export default SearchBar;
