import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import { View, Text } from 'react-native';

const auth = getAuth();
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ extraData, navigation }) => {
  function CustomDrawerContent({ navigation, extraData }) {
    return (
      <View
        style={{
          marginTop: 55,
          marginLeft: 20,
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: '#faeb2c',
        }}
      >
        <Icon name="face" size={50} color="#000" />
        <Text
          style={{
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 5,
            color: 'black',
          }}
        >
          {extraData.user.email}
        </Text>
        <Icon.Button
          name="logout"
          size={25}
          iconStyle={{ color: '#000' }}
          backgroundColor="#faeb2c"
          onPress={() =>
            signOut(auth)
              .then(() => {
                extraData.toggleAuthScreens();
                navigation.navigate('Login');
              })
              .catch((e) => console.log('sign out failed', { e }))
          }
        >
          <Text>Sign Out</Text>
        </Icon.Button>
      </View>
    );
  }

  // console.log(extraData.user);

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent navigation={navigation} extraData={extraData} />
      )}
    >
      <Drawer.Screen
        name="DrawerHome"
        options={({ navigation }) => ({
          title: 'Date Night',
          headerTitleStyle: {
            color: '#000',
          },
          headerLeft: () => (
            <Icon
              name="menu"
              size={30}
              style={{ marginLeft: 10 }}
              color="#000"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      >
        {(props) => (
          <TabNavigator {...props} extraData={extraData}></TabNavigator>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
