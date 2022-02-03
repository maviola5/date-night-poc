import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements';
import {
  getUsers,
  addFriend as addF,
  getFriends,
} from '../services/dateNightService';
import { MaterialIcons as Icon } from '@expo/vector-icons';

function FriendsScreen() {
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [addedFriend, setAddedFriend] = useState(null);

  useEffect(() => {
    getFriends().then((res) => {
      // console.log(res);
      setFriends(() => res);
    });
  }, [addedFriend]);

  useEffect(() => {
    if (search) {
      getUsers(search).then((res) => {
        setUserList(() => res);
      });
    } else {
      setUserList(() => []);
    }
  }, [search]);

  const addFriend = (friend) => {
    addF(friend.id, friend.fullName, '').then((res) => {
      console.log('Successfully added friend');
      setAddedFriend(() => friend);
    });
  };

  const Item = ({ item, index }) => {
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => addFriend(item)}>
          <Text style={{}}>
            <Icon name="add-circle-outline" size={24} /> {index}:{' '}
            {item.fullName}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const Friend = ({ item, index }) => {
    // console.log(item);
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => console.log(item)}>
          <Text style={{}}>
            <Icon name="remove-circle-outline" size={24} /> {index}:{' '}
            {item.friendName}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <SearchBar
          containerStyle={{
            margin: 20,
          }}
          placeholder="Search for friends..."
          onChangeText={(search) => {
            setSearch(search?.toLowerCase());
          }}
          value={search}
        ></SearchBar>

        <FlatList
          data={userList}
          renderItem={Item}
          keyExtractor={(item) => item.id}
        />

        <FlatList
          data={friends}
          renderItem={Friend}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

export default FriendsScreen;
