import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getShowList } from '../services/dateNightService';

function ListScreen({ navigation }) {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getShowList().then((res) => {
        setList(() => res);
        setCount(() => res.length);
      });
    });

    return unsubscribe;
  });

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
      <Text
        style={{
          fontSize: 25,
          marginBottom: 30,
        }}
      >
        My List
      </Text>
      <FlatList
        data={list}
        renderItem={Item}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

export default ListScreen;
