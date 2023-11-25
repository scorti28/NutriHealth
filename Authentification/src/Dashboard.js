import { Text, TextInput, Button, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';

const Dashboard = () => {
  const [name, setName] = useState({ firstName: '', lastName: '' });
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');

  const handleSaveData = () => {
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      // Create a reference to the 'users' collection in Firebase
      const userRef = firebase.firestore().collection('users').doc(currentUser.uid);

      // Save the entered data to the 'users' collection
      userRef.set({
        gender,
        weight,
        height,
        age,
      })
        .then(() => {
          console.log('Data saved successfully!');
        })
        .catch((error) => {
          console.error('Error saving data:', error);
        });
    }
  };

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
      <Text>Introduce your gender:</Text>
      <TextInput
        placeholder="Gender"
        maxLength={6}
        mode="flat"
        style={styles.input}
        value={gender}
        onChangeText={(text) => setGender(text)}
      />
      <Text>Introduce your weight:</Text>
      <TextInput
        placeholder="Weight"
        keyboardType="phone-pad"
        mode="flat"
        style={styles.input}
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />
      <Text>Introduce your height:</Text>
      <TextInput
        placeholder="Height"
        keyboardType="phone-pad"
        mode="flat"
        style={styles.input}
        value={height}
        onChangeText={(text) => setHeight(text)}
      />
      <Text>Introduce your age:</Text>
      <TextInput
        placeholder="Age"
        keyboardType="phone-pad"
        mode="flat"
        style={styles.input}
        value={age}
        onChangeText={(text) => setAge(text)}
      />
      <Button title="Submit" onPress={handleSaveData} />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
    backgroundColor: '#ffffff',
  },
  input: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});