import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button } from 'react-native';
import { MaterialIcons as Icon } from '@expo/vector-icons';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

function FriendsScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Friends</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: () => <Icon size={30} style={{}} name="home-filled" />,
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarIcon: () => <Icon size={30} style={{}} name="people" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
