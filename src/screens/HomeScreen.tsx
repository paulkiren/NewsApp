import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet, StatusBar} from 'react-native';
import GuardianApiServices from '../services/GuardianApiServices';
// const Item = (title: string) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );
const Item = ({item}: {item: INewsData}) => {
  console.log("MY Item ", item);
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.webTitle}</Text>
    </View>
  );
};
export interface INewsData {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: Date;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

export interface Response {
  status: string;
  userTier: string;
  total: number;
  startIndex: number;
  pageSize: number;
  currentPage: number;
  pages: number;
  orderBy: string;
  results: INewsData[];
}

const renderItem = ({item}: {item: INewsData}) => <Item item={item} />;
const HomeScreen = () => {
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [newsData, setnewsData] = useState([]);

  useEffect(() => {
    setIsLoadingData(true);
    GuardianApiServices.getNewsFromApi()
      .then(response => {
        const myresponse = response.response;
        console.log('My response ', response.response, myresponse.results);

        if (myresponse.status == 'ok') setnewsData(myresponse?.results);
      })
      .catch(e => {
        console.log('Api error', e);
      })
      .finally(() => {
        setIsLoadingData(false);
      });
  }, []);
  return (
    <View   style={{flex: 1, backgroundColor: 'violet'}}>
      <Text> {'Hello'} </Text>
      <FlatList
        data={newsData}
        renderItem={renderItem}
        style={{flex: 1, backgroundColor: 'yellow'}}
        keyExtractor={item => item.id}
        refreshing={isLoadingData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default HomeScreen;
