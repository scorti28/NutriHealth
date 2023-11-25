import { firebase } from '../config';

export const onChangePassword = () => {
  console.log("Nu intra aici!!!")
  const currentUser = firebase.auth().currentUser;

  if (currentUser) {
    console.log(currentUser)
    firebase
      .auth()
      .sendPasswordResetEmail(currentUser.email)
      .then(() => {
        alert('Password reset email sent!');
      })
      .catch((error) => {
        alert(error.message);
      });
  }
};

export const onSignOut = () => {
  firebase.auth().signOut();
};
