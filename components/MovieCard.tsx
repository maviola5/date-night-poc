import TinderCard from 'react-tinder-card';
import { View, ImageBackground, Text } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { environment } from '../.environment';

const MovieCard = ({ movie, onSwipe, dimensions }) => {
  const {
    movieServiceAPI: { imageURL },
  } = environment;

  return (
    <TinderCard onSwipe={(dir) => onSwipe(dir, movie)}>
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          height: dimensions?.height - 100,
          top: 20,
          right: 20,
          left: 20,
          flex: 1,
        }}
      >
        <ImageBackground
          source={{
            uri: `${imageURL}w600_and_h900_bestv2${movie.poster_path}`,
          }}
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
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
            {movie.title || movie.name}
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
        </ImageBackground>
      </View>
    </TinderCard>
  );
};

export default MovieCard;
