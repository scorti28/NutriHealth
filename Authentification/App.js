import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {useState, useEffect} from 'react';
import {firebase} from './config';
import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import Header from "./components/Header";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //Handle user state changes
  function onAuthStateChanged(user){
    setUser(user);
    if(initializing)
      setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if(initializing)
    return null;

  if(!user){
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            headerTitle: () => <Header name="NutriHealth" />,
            headerStyle: {
              borderBottomLeftRadius:50,
              borderBottomRightRadius:50,
              backgroundColor: 'lightgreen', 
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 25
            }
          }}/>

        <Stack.Screen 
          name="Register" 
          component={Registration} 
          options={{
            headerTitle: () => <Header name="NutriHealth" />,
            headerStyle: {
              borderBottomLeftRadius:50,
              borderBottomRightRadius:50,
              backgroundColor: 'lightgreen', 
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 25
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
            headerTitle: () => <Header name="Dashboard" />,
            headerStyle: {
              borderBottomLeftRadius:50,
              borderBottomRightRadius:50,
              backgroundColor: 'lightgreen', 
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 5,
              elevation: 25
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