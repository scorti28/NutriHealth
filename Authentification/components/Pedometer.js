import { StyleSheet, Text, View} from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import {Pedometer} from 'expo'

const Dashboard = () => {
  const [name, setName] = useState({ firstName: '', lastName: '' });
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      firebase
        .firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            const userData = snapshot.data();
            setName({
              firstName: userData?.firstName || '',
              lastName: userData?.lastName || '',
            });
          } else {
            console.log("User does not exist!");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);


  return (
    <View style={styles.container}>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
    backgroundColor: '#ffffff'
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 200,
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25
  }
});



//App.js for Pedometer
import React, { useState, useEffect } from 'react';
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
  const [pedometerSubscription, setPedometerSubscription] = useState(null);

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
            // Start pedometer subscription
            const subscription = subscribe();
            setPedometerSubscription(subscription); // Add this line
          }
        });
      if (initializing) setInitializing(false);
  
      // Update Firebase with step count
      firebase.firestore().collection('users').doc(authUser.uid).update({
        stepCount: 0, // You can update this value with the actual step count
      });
    } else {
      setUser(null);
      // Stop pedometer subscription
      pedometerSubscription && pedometerSubscription.remove();
      
    }
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((authUser) => {
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
  
              // Start pedometer subscription
              const subscription = subscribe();
              setPedometerSubscription(subscription); // Add this line
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          })
          .finally(() => {
            if (initializing) setInitializing(false);
          });
  
        // Update Firebase with step count
        firebase.firestore().collection('users').doc(authUser.uid).update({
          stepCount: 0, // You can update this value with the actual step count
        });
      } else {
        setUser(null);
        // Stop pedometer subscription
        pedometerSubscription && pedometerSubscription.remove();
      }
    });
  
    return () => subscriber();
  }, [pedometerSubscription, initializing]);

  const onSignOut = () => {
    firebase.auth().signOut();
  };

  const onChangePassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        alert('Password reset email sent!');
      })
      .catch((error) => {
        alert(error.message);
      });
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

        //   export default () => {
        //     return (
        //       <NavigationContainer>
        //         <App />
        //       </NavigationContainer>
        //     )
        //   }