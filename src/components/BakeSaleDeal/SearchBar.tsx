import * as React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import debounce from 'lodash.debounce';
type searchProps = {
  searchDeals: any;
  initialSearchTerm:string;
};
type searchState = {
  searchTerm: string;
};
class SearchBar extends React.Component<searchProps, searchState> {
  inputElement: TextInput | null | undefined | null;
  constructor(props: searchProps | Readonly<searchProps>) {
    super(props);
    this.state = {searchTerm: props.initialSearchTerm};
  }
  searchDeals = (searchTerm:string) => {
    this.props.searchDeals(searchTerm);
    this.inputElement?.blur();
  }
  debouncedSearchDeals = debounce(this.searchDeals, 300);
  handleChange = (searchTerm: any) => {
    this.setState({searchTerm}, () => {
      this.debouncedSearchDeals(this.state.searchTerm);
    });
  };
  render() {
    return (
      <TextInput
      ref={(inputElement) => { this.inputElement = inputElement; }}
        style={styles.input}
        placeholder="Search Deals"
        onChangeText={this.handleChange}
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
