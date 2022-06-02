import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet, StatusBar} from 'react-native';
import GuardianApiServices from '../services/GuardianApiServices';
const Item = ({item}: {item: INewsData}) => {
  console.log('MY Item ', item);
  const getDateValue = ''+item?.webPublicationDate;
  return (

    <View style={styles.item}>
      <Text style={styles.title}>{item.webTitle}</Text>
      <Text style={styles.date}>{getDateValue}</Text>
      <Text style={styles.id}>{item.id}</Text>
      <Text style={styles.type}>{item.type}</Text>
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
    <View
      style={{
        flex: 1,
        backgroundColor: 'violet',
      }}>
      <View style={{justifyContent: 'center', alignContent: 'space-around'}}>
        <Text> {'Guardian News'}</Text>
      </View>

      <FlatList
        data={newsData}
        renderItem={renderItem}
        style={{flex: 1, backgroundColor: 'lightblue'}}
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
    fontSize: 16,
  },
  date: {
    fontSize:12,
    color:'lightgreen'
  },
  id: {
    fontSize:10,
    color:'lightblue'
  },
  type: {
    fontSize:12,
    color:'orange'
  }
});

export default HomeScreen;
