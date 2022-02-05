import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Avatar, ListItem, SearchBar } from 'react-native-elements';
import {
  getUsers,
  addFriend,
  getFriends,
  removeFriend,
} from '../services/date-night-service';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const FriendsScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [addedFriend, setAddedFriend] = useState(null);
  const [removedFriend, setRemovedFriend] = useState(null);

  useEffect(() => {
    getFriends().then((res) => {
      setFriends(() => res);
    });
  }, [addedFriend, removedFriend]);

  useEffect(() => {
    if (search) {
      getUsers(search).then((res) => {
        setUserList(() => res);
      });
    } else {
      setUserList(() => []);
    }
  }, [search]);

  const add = (friend) => {
    addFriend(friend.id, friend.fullName, '').then((res) => {
      console.log('Successfully added friend');
      setAddedFriend(() => friend);
    });
  };

  const remove = (friend) => {
    console.log(friend);
    removeFriend(friend.id).then((res) => {
      console.log('Successfully removed friend');
      setRemovedFriend(() => friend);
    });
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <View>
        <SearchBar
          placeholder="Search for friends..."
          onChangeText={(search) => {
            setSearch(search?.toLowerCase());
          }}
          value={search}
        ></SearchBar>

        <View style={{ marginBottom: 20 }}>
          {(userList as any[]).map((user, i) => (
            <ListItem key={user.id} bottomDivider onPress={() => add(user)}>
              <Avatar source={{ uri: 'https://i.pravatar.cc/150?img=3' }} />
              <ListItem.Content
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <ListItem.Title>{user.fullName}</ListItem.Title>
                <Icon name="add-circle-outline" size={24} />
              </ListItem.Content>
            </ListItem>
          ))}
        </View>

        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text>Friends</Text>
          {(friends as any[]).map((friend, i) => (
            <ListItem key={friend.id} bottomDivider>
              <Pressable
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => navigation.navigate('Friend', { friend })}
              >
                <Avatar
                  containerStyle={{ marginRight: 14 }}
                  source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                />
                <ListItem.Content
                  style={{
                    justifyContent: 'space-between',
                    flex: 1,
                    flexDirection: 'row',
                  }}
                >
                  <ListItem.Title style={{ flex: 4 }}>
                    {friend.friendName}
                  </ListItem.Title>
                  <Pressable onPress={() => remove(friend)}>
                    <Icon name="remove-circle-outline" size={24} />
                  </Pressable>
                </ListItem.Content>
              </Pressable>
            </ListItem>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default FriendsScreen;

// https://i.pravatar.cc/150?img=3
// https://i.pravatar.cc/150?img=66
// https://i.pravatar.cc/150?img=48
