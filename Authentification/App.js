import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './config';
import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';
import Header from './components/Header';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(false);
  const [user, setUser] = useState(null);

  function onAuthStateChanged(authUser) {
    if (authUser) {
      firebase
        .firestore()
        .collection('users')
        .doc(authUser.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            const userData = snapshot.data();
            setUser(userData);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        })
        .finally(() => {
          setInitializing(false);
        });
    } else {
      setUser(null);
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((authUser) => onAuthStateChanged(authUser));
    return () => subscriber(); // Unsubscribe on component unmount
  }, []);

  const onSignOut = () => {
    firebase.auth().signOut();
  };

  const onChangePassword = () => {
    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .sendPasswordResetEmail(firebase.auth().currentUser.email)
        .then(() => {
          alert('Password reset email sent!');
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  if (initializing) 
    return null;

  if(!user){
  return (
    <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: () => <Header name="NutriHealth" screenName="Login" showUserHeader={false}/>,
                headerStyle: {
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: 'lightgreen',
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                  elevation: 25,
                }
              }}/>
            <Stack.Screen
              name="Registration"
              component={Registration}
              options={{
                headerTitle: () => <Header name="NutriHealth" screenName="Registration" showUserHeader={false}/>,
                headerStyle: {
                  borderBottomLeftRadius: 50,
                  borderBottomRightRadius: 50,
                  backgroundColor: 'lightgreen',
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.5,
                  shadowRadius: 5,
                  elevation: 25,
                }
              }}/>
          </Stack.Navigator>
        );
        }
        return (
          <Stack.Navigator>
            <Stack.Screen 
            name="Dashboard"
            component={Dashboard}
            options={{
              headerTitle: () => (
                <Header
                  showUserHeader={true}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  onSignOut={onSignOut}
                  onChangePassword={onChangePassword}
                />
              ),
              headerStyle: {
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: 'lightgreen',
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 5,
                elevation: 25,
              }
            }}/>
      </Stack.Navigator>
        );
          }

          export default () => {
            return (
              <NavigationContainer>
                <App />
              </NavigationContainer>
            )
          }