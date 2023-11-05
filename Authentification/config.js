//firebase configuration key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDg409Dk-7smOr7TNFF3E3LT_bjFOeXAtI",
  authDomain: "nutrihealth-7b114.firebaseapp.com",
  projectId: "nutrihealth-7b114",
  storageBucket: "nutrihealth-7b114.appspot.com",
  messagingSenderId: "937871240689",
  appId: "1:937871240689:web:b7141411473a829dfc2850",
  measurementId: "G-JG1HTRDK7K"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};
