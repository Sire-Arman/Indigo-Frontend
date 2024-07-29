 // Scripts for firebase and firebase messaging
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

 // Initialize the Firebase app in the service worker by passing the generated config
 const firebaseConfig = {
  apiKey: "AIzaSyDBwRH0v2QyBVCIaIAF1o3YU_wy0bJh45w",
  authDomain: "indigo-flight-app.firebaseapp.com",
  projectId: "indigo-flight-app",
  storageBucket: "indigo-flight-app.appspot.com",
  messagingSenderId: "460156525443",
  appId: "1:460156525443:web:ed3eebdfaf54ad0a0074b6",
  measurementId: "G-EFFBYLVW6N"
 };

 firebase.initializeApp(firebaseConfig);

 // Retrieve firebase messaging
 const messaging = firebase.messaging();

 messaging.onBackgroundMessage(function(payload) {
   console.log("Received background message ", payload);

   const notificationTitle = payload.notification.title;
   const notificationOptions = {
     body: payload.notification.body,
   };

   self.registration.showNotification(notificationTitle, notificationOptions);
 });