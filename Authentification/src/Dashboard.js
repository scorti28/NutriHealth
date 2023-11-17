import { StyleSheet, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { firebase } from '../config';

const Dashboard = () => {
  const [name, setName] = useState({ firstName: '', lastName: '' });

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
    <SafeAreaView style={styles.container}>
    </SafeAreaView>
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