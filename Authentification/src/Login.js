import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 26 }}>Login</Text>
            <View style={{ marginTop: 40 }}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize='none'
                    autoCorrect={false}
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
                onPress={() => loginUser(email, password)}
                style={styles.button}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
                style={{ marginTop: 20 }}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                    Don't have an account? Register Now!
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

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
  
