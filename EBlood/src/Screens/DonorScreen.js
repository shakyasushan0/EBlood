import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  Searchbar,
  useTheme,
  List,
  Avatar,
  TouchableRipple,
} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {tempAvatar} from '../Constants/Images';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import LoadingScreen from './LoadingScreen';

const DonorScreen = (props) => {
  const [query, setQuery] = useState('');
  const [arrayHolder, setArrayHolder] = useState([]);
  const {donors} = useSelector((state) => state.donors);
  const {user} = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const {colors} = useTheme();
  useEffect(() => {
    if (donors.length != 0) {
      const donorData = donors.filter((item) => item._id != user._id);
      setData(donorData);
      setArrayHolder(donorData);
    }
  }, []);

  const RenderDonors = (props) => {
    return (
      <TouchableRipple>
        <List.Item
          onPress={() => props.navigation.navigate('DonorDetail')}
          title={props.item.fullName}
          description={<Text>{props.item.bloodGroup}</Text>}
          left={() => (
            <Avatar.Image
              source={donors.avatar ? {uri: donors.avatar} : tempAvatar}
              size={50}
            />
          )}
          right={() => (
            <Entypo
              name="chevron-right"
              size={24}
              color="gray"
              style={{marginTop: 12}}
            />
          )}
          style={styles.list}
          titleStyle={{color: colors.secondary}}
        />
      </TouchableRipple>
    );
  };

  const searchFilter = (text) => {
    const newData = arrayHolder.filter((item) => {
      const itemData = item.bloodGroup.toUpperCase();

      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <View style={styles.headerContainer}>
          <Feather
            name="menu"
            size={32}
            color={colors.headerTitle}
            onPress={() => props.navigation.openDrawer()}
          />
          <Searchbar
            placeholder="Search (Eg: A+)"
            style={styles.searchBar}
            //value={query}
            onChangeText={(text) => searchFilter(text)}
          />
        </View>
      </View>
      <View>
        {donors.length != 0 && (
          <FlatList
            data={data}
            renderItem={({item}) => <RenderDonors item={item} {...props} />}
            keyExtractor={(item) => item._id}
          />
        )}
        {donors.length == 0 && (
          <View style={{marginTop: heightPercentageToDP('40%')}}>
            <LoadingScreen />
          </View>
        )}
      </View>
    </View>
  );
};
export default DonorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    elevation: 10,
    paddingTop: 12,
    paddingLeft: 5,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  searchBar: {
    backgroundColor: 'white',
    width: wp('75%'),
    marginTop: -5,
    marginLeft: 20,
  },
  list: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#DAE0E2',
  },
});
