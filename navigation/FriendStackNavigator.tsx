import { createStackNavigator } from '@react-navigation/stack';
import FriendScreen from '../screens/FriendDetailScreen';
import FriendsScreen from '../screens/FriendListScreen';

const Stack = createStackNavigator();

const FriendsStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Friends" component={FriendsScreen} />
      <Stack.Screen
        name="Friend"
        component={FriendScreen}
        options={{
          animationEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default FriendsStackNavigation;
