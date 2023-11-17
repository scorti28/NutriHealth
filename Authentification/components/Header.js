import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Header = ({ showUserHeader, firstName, lastName, onSignOut, onChangePassword }) => {
  if (showUserHeader) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Hello, 
          {firstName} {lastName}!
        </Text>
        <TouchableOpacity onPress={onChangePassword} style={{ marginHorizontal: 10 }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Change Password</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSignOut} style={{ marginHorizontal: 10 }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <Text style={{ fontSize: 18, fontWeight: 'bold' }}>NutriHealth</Text>;
  }
};

const styles = {
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20, 
  },
  buttonText: {
    color: 'black',
  },
};

export default Header;
