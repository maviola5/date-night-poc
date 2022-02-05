import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import FriendsStackNavigation from './FriendStackNavigator';
import { HomeScreen, WatchListScreen } from '../screens';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ extraData }) => {
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
        {(props) => <HomeScreen {...props} extraData={extraData} />}
      </Tab.Screen>
      <Tab.Screen
        name="List"
        component={WatchListScreen}
        options={{
          tabBarLabel: () => {
            return null;
          },
          headerShown: false,
          tabBarIcon: () => <Icon size={30} color="#faeb2c" name="list" />,
        }}
      />
      <Tab.Screen
        name="FriendsStack"
        component={FriendsStackNavigation}
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
