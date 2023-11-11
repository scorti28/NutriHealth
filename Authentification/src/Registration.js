import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../config';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const registerUser = async (email, password, firstName, lastName) => {
        try {
            // Create user with email and password
            await firebase.auth().createUserWithEmailAndPassword(email, password);

            // Send email verification
            await firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: 'https://nutrihealth-7b114.firebaseapp.com'
            });

            // Add user data to Firestore
            await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                firstName,
                lastName,
                email
            });

            // Alert after successful registration
            alert('Registration successful! Verification email sent.');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 23 }}>Register Here!</Text>
            <View style={{ marginTop: 40 }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="First Name"
                    onChangeText={(firstName) => setFirstName(firstName)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Last Name"
                    onChangeText={(lastName) => setLastName(lastName)}
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={() => registerUser(email, password, firstName, lastName)}
                style={styles.button}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Registration;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100,
      backgroundColor: '#ffffff', // Change the background color to white
    },
    textInput: {
      paddingTop: 20,
      paddingBottom: 10,
      width: 400,
      fontSize: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#2ecc71', // Green color for the border
      marginBottom: 10,
      textAlign: 'center',
      color: '#2ecc71', // Green color for the text
    },
    button: {
        marginTop: 20, // Reduced margin for a more compact look
        height: 50, // Adjusted height for a smaller button
        width: 200, // Adjusted width for a smaller button
        backgroundColor: '#2ecc71', // Green color for the button
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25, // Adjusted border radius for a smoother look
      },
  });
  
