import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegistrationScreen } from './screens';
import { decode, encode } from 'base-64';
import { auth, onAuthStateChanged, getDoc, db, doc } from './firebase/config';
import DrawerNavigator from './navigation/DrawerNavigator';
import { UserContext } from './context/UserContext';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const toggleAuthScreens = () => {
    setUser(null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        getDoc(userRef)
          .then((doc) => {
            const userData = doc.data();
            setLoading(false);
            setUser(userData as any);
            // console.log(userData);
          })
          .catch((e) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    // <UserContext.Provider value={user}>
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: '#fff',
          background: '#faeb2c',
          card: '#faeb2c',
          text: '#fff',
          border: 'rgb(199, 199, 204)',
          notification: 'rgb(255, 69, 58)',
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user ? (
          <Stack.Screen name="Home">
            {(props) => (
              <DrawerNavigator
                {...props}
                extraData={{ user, toggleAuthScreens }}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    // </UserContext.Provider>
  );
}
