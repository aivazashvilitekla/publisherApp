import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'litp-4bf6a',
  appId: '1:287405447542:web:55682045743fb9710b0257',
  storageBucket: 'litp-4bf6a.appspot.com',
  apiKey: 'AIzaSyCxdvOd9U6K5ZqdX_arznV59mL9QPYq9lM',
  authDomain: 'litp-4bf6a.firebaseapp.com',
  messagingSenderId: '287405447542',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
