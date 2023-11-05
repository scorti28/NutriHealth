import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
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
        marginTop: 100
    },
    button: {
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    }
});
