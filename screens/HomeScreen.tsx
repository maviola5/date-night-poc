import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import MovieCard from '../components/MovieCard';
import { getTrending } from '../services/dateNightService';

const HomeScreen = ({ navigation }) => {
  const [trending, setTrending] = useState([] as any[]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (trending.length) {
      console.log('not yet - ' + trending.length);
      return;
    } else {
      console.log('getting more ' + page);
      getTrending(page).then((res) => {
        setTrending(res.results.slice(0, 5));
        setPage(res.page);
      });
    }
  }, [trending]);

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete) => {
    // console.log(direction);
    // if (direction === 'right') {
    //   console.log(`you liked ${nameToDelete}`);
    // }
    // if (direction === 'left') {
    //   console.log(`you disliked ${nameToDelete}`);
    // }

    // console.log('removing: ' + nameToDelete);
    // setLastDirection(direction);
    // setTrending(trending.slice(1));

    // setTrending(trending.filter((x, i) => i !== 1));
    // console.log('trending' + trending.length);
    console.log(nameToDelete);
    console.log();
    setTrending((trending) => trending.slice(1));
  };

  const initialDimensions: null | any = null;
  const [dimensions, setDimensions] = useState(initialDimensions);
  const onLayout = (event) => {
    if (dimensions) return;
    console.log(event.nativeEvent.layout);
    let { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  return (
    <View
      onLayout={onLayout}
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}
    >
      {trending.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onSwipe={swiped}
            dimensions={dimensions}
          />
        );
      })}
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          flex: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          onPress={() => console.log('added to watch list')}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="bookmark-border" size={30} color="#faeb2c" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('watched')}
        >
          <Icon name="done" size={30} color="#faeb2c" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('sending to friend')}
        >
          <Icon name="send" size={30} color="#faeb2c" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
