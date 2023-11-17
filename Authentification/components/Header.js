import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Header = ({ showUserHeader, firstName, lastName, onSignOut, onChangePassword }) => {
  if (showUserHeader) {
    return (
      <>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Hello, {firstName} {lastName}!
        </Text>
        <TouchableOpacity onPress={onChangePassword} style={{ marginHorizontal: 10 }}>
          <Text>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSignOut} style={{ marginHorizontal: 10 }}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </>
    );
  } else {
    return <Text style={{ fontSize: 18, fontWeight: 'bold' }}>NutriHealth</Text>;
  }
};

export default Header;
