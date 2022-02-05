import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFriendsWatchList } from '../services/date-night-service';
import { MaterialIcons as Icon } from '@expo/vector-icons';

const FriendScreen = ({ route }) => {
  const friend = route.params.friend;
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    getFriendsWatchList({ friendId: friend.friendId }).then((res) => {
      console.log(res);
      setWatchList(() => res);
    });
  }, []);

  const Item = ({ item, index }) => {
    return (
      <View>
        <Text>
          {index}: {item.showTitle}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
        {friend.friendName}'s Watch List
      </Text>
      <Text>{JSON.stringify(friend)}</Text>
      <FlatList
        data={watchList}
        renderItem={Item}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default FriendScreen;
