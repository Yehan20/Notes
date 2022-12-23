// contains all the firebase files

import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth';

const firebaseConfig={
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
}

const app = initializeApp(firebaseConfig);


export default app;
export const auth = getAuth(app)

