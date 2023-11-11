import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';

const Dashboard = () => {
    const [name, setName] = useState({ firstName: '', lastName: '' });

    //change the password
    const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
        .then(() => {
            alert("Password reset email sent!")
        }).catch((error) => {
            alert(error.message)
        })

    }

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
                            firstName: userData.firstName,
                            lastName: userData.lastName
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
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                Hello, {name.firstName} {name.lastName} !
            </Text>
            <TouchableOpacity
                onPress={() => {
                    changePassword();
                }}
                style={styles.button}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    firebase.auth().signOut();
                }}
                style={styles.button}
            >
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Sign Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100,
      backgroundColor: '#ffffff', // Change the background color to white
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
