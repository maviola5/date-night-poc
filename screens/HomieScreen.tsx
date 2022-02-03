import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Pressable,
} from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { getTrending, setShowPreferences } from '../services/dateNightService';
import SwipeCards from 'react-native-swipe-cards-deck';
import { environment } from '../.environment';
import { Show } from '../models/Show';
const {
  movieServiceAPI: { imageURL },
} = environment;

const HomeScreen = ({ navigation, extraData }) => {
  const [cards, setCards] = useState([] as any[]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(extraData.user);

  useEffect(() => {
    // console.log(extraData);
    console.log('count: ', count);
    if (count) {
      console.log('not yet, cards lenght is: ' + cards.length);
      return;
    } else {
      console.log('getting more with page: ' + page);
      getTrending(page).then((res) => {
        setCards((cards) => res.results);
        setPage((page) => page + 1);
        setCount((count) => res.results.length);
      });
    }
  }, [count]);

  function handleYup(card: Show) {
    const show = cards.find((c) => c.id === card.id);
    setShowPreferences({
      userId: user.id,
      showId: show.id,
      yes: true,
      showTitle: show.name || show.title,
      showPoster: `${imageURL}w600_and_h900_bestv2${show.poster_path}`,
    });
    setCount((count) => count - 1);
    return true; // return false if you wish to cancel the action
  }

  function handleNope(card) {
    const show = cards.find((c) => c.id === card.id);
    setShowPreferences({
      userId: user.id,
      showId: show.id,
      no: true,
      showTitle: show.name || show.title,
      showPoster: `${imageURL}w600_and_h900_bestv2${show.poster_path}`,
    });
    setCount((count) => count - 1);
    return true;
  }

  function addToWatchList() {}

  function addToWatched() {}

  function shareShow() {
    console.log('Sharing show', {
      user: user.id,
      // showId: show.id
    });
  }

  function Card({ data, dimensions, handleYup }) {
    // console.log(JSON.stringify(data));
    return (
      // <Pressable onPressIn={() => console.log('get details')}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageBackground
          source={{
            uri: `${imageURL}w600_and_h900_bestv2${data.poster_path}`,
          }}
          style={{
            width: dimensions?.width,
            height: dimensions?.height,
            flex: 1,
          }}
        >
          <Text
            style={{
              position: 'absolute',
              top: 0,
              margin: 10,
              paddingRight: 15,
              paddingLeft: 15,
              paddingTop: 5,
              paddingBottom: 5,
              color: '#00040D',
              backgroundColor: '#faeb2c',
              fontWeight: '600',
            }}
          >
            {data.title || data.name}
          </Text>
          <Icon
            name="thumb-down"
            size={50}
            color="#faeb2c"
            style={{
              position: 'absolute',
              top: dimensions?.height / 2 - 100,
              left: 20,
            }}
          />

          {/* <TouchableOpacity onPress={handleYup}> */}
          <Icon
            name="thumb-up"
            size={50}
            color="#faeb2c"
            style={{
              position: 'absolute',
              top: dimensions?.height / 2 - 100,
              right: 20,
            }}
          />
          {/* </TouchableOpacity> */}
        </ImageBackground>
      </View>
      // </Pressable>
    );
  }

  function StatusCard({ text }) {
    return (
      <View
        style={{
          backgroundColor: 'white',
        }}
      >
        <Text
          style={{
            fontSize: 22,
          }}
        >
          {text}
        </Text>
      </View>
    );
  }

  const initialDimensions: null | any = null;
  const [dimensions, setDimensions] = useState(initialDimensions);
  const onLayout = (event) => {
    if (dimensions) return;
    let { width, height } = event.nativeEvent.layout;
    setDimensions({ width, height });
  };

  return (
    <View
      onLayout={onLayout}
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {cards ? (
          <SwipeCards
            cards={cards}
            renderCard={(cardData) => (
              <Card
                data={cardData}
                handleYup={handleYup}
                dimensions={dimensions}
              />
            )}
            keyExtractor={(cardData) => String(cardData.id)}
            renderNoMoreCards={() => <StatusCard text="No more cards..." />}
            actions={{
              nope: {
                show: false,
                onAction: handleNope,
              },
              yup: {
                show: false,
                onAction: handleYup,
              },
            }}
          />
        ) : (
          <StatusCard text="Loading..." />
        )}
      </View>
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
