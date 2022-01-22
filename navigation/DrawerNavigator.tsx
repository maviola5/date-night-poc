import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

const auth = getAuth();
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ extraData, navigation }) => {
  useEffect(() => {}, []);

  function CustomDrawerContent({ navigation, extraData }) {
    return (
      <View
        style={{
          marginTop: 55,
          marginLeft: 20,
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        <Icon name="face" size={50} />
        <Text style={{ marginTop: 20, marginBottom: 20, marginLeft: 5 }}>
          {extraData.user.email}
        </Text>
        <Icon.Button
          name="logout"
          size={25}
          iconStyle={{ color: '#000' }}
          backgroundColor="#fff"
          onPress={() =>
            signOut(auth)
              .then(() => {
                console.log('sign out success');
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

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent navigation={navigation} extraData={extraData} />
      )}
    >
      <Drawer.Screen
        name="DrawerHome"
        component={TabNavigator}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            <Icon
              name="menu"
              size={30}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
