import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import HomieScreen from '../screens/HomieScreen';
import ListScreen from '../screens/ListScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ extraData }) => {
  // console.log(extraData.user);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: () => <Icon size={30} color="#faeb2c" name="swipe" />,
        }}
      >
        {(props) => <HomieScreen {...props} extraData={extraData} />}
      </Tab.Screen>
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarIcon: () => <Icon size={30} color="#faeb2c" name="list" />,
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
          tabBarIcon: () => <Icon size={30} color="#faeb2c" name="people" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
