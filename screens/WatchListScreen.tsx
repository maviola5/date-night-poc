import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { getWatchList } from '../services/date-night-service';

export const WatchListScreen = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getWatchList().then((res) => {
        setList(() => res);
        setCount(() => res.length);
        console.log(res);
      });
    });

    return unsubscribe;
  });

  const Show = ({ item, index }) => {
    return (
      <View>
        <Text>
          {index}: {item.showTitle}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 25,
          marginBottom: 30,
        }}
      >
        My List
      </Text>

      {(list as any[]).map((show, i) => (
        <ListItem key={show.id} bottomDivider onPress={() => console.log(show)}>
          <Avatar
            size={100}
            source={{
              uri: show.showPoster,
            }}
          />
          <ListItem.Content>
            <ListItem.Title>{show.showTitle}</ListItem.Title>
            {/* <ListItem.Subtitle>{}</ListItem.Subtitle> */}
          </ListItem.Content>
        </ListItem>
      ))}
    </ScrollView>
  );
};

export default WatchListScreen;
