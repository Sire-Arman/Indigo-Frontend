import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import { messaging, getToken, onMessage } from './firebase';
import { messaging, getToken, onMessage } from './firebase';
import FlightStatus from './components/FlightStatus';
import './App.css'

function App() {
  useEffect(() => {
        // Requet permission to send notifications
    Notification.requestPermission()
        .then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                // Get FCM token
                return getToken(messaging, { vapidKey: 'BJzD4nqGRz3G0gj7jBa6UV7MtLJhX7wEo9TR8VQNRZZF3CU04P8RdFlsLKxWAObBAaAMOAY3cgwi7sLEIdjJPXU' });
            } else {
                console.log('Unable to get permission to notify.');
            }
        })
        .then((token) => {
            if (token) {
                console.log('FCM Token:', token);
                // Send the token to your server to subscribe the user for notifications
            }
        })
        .catch((error) => {
            console.error('Error getting FCM token:', error);
        });

    // Handle incoming messages
    onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        // Handle the message and show notification
    });
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //         .register('../firebase-messaging-sw.js')
  //         .then((registration) => {
  //             console.log('Service Worker registered with scope:', registration.scope);
  //         })
  //         .catch((err) => {
  //             console.error('Service Worker registration failed:', err);
  //         });
  // }
}, []);
  return (
    <>
      <div className='App'>
        Flight Status App
      </div>
      {/* <FlightStatus /> */}
       
    </>
  )
}

export default App
