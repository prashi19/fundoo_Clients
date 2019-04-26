import firebase from 'firebase';
import { pushNotification } from './services/noteServices';
export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "754900614265"
  });

  navigator.serviceWorker
    .register('/my-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
}

export const askForPermissioToReceiveNotifications = async () => {
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('token do usuário:', token);
      localStorage.setItem("push Token",token)
      var data={
        pushToken:token,
        userId:localStorage.getItem("user_id")
      }
      pushNotification(data)
      return token;
    } catch (error) {
      console.error(error);
    }
  }

  export const deleteToken = async () => {
    try {
      const messaging = firebase.messaging();
      const token = await messaging.getToken();
     var token1=await messaging.deleteToken(token);
     console.log("token deleted---->",token1);
     
    } catch (error) {
      console.error(error);
    }
  }
