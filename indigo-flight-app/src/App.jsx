import React, { useState, useEffect } from 'react'
import { messaging, getToken, onMessage } from './firebase';
import './App.css'
import FlightDashboard from './components/FlightDashboard';
import axios from 'axios';
import abc from './assets/abc.png'


function App() {
  const [FCM_TOKEN, setFCM_TOKEN] = useState("");
  useEffect(()=>{
    const VapidKey = import.meta.env.VITE_VAPID_KEY;
  // console.log(VapidKey);
  Notification.requestPermission()
  .then((permission) => {
      if (permission === 'granted') {
          console.log('Notification permission granted.');
          // Get FCM token
          return getToken(messaging, { vapidKey: VapidKey });
      } else {
          console.log('Unable to get permission to notify.');
      }
  })
  .then((token) => {
      if (token) {
        setFCM_TOKEN(token);
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
  },[])
async function sendNotification() {
  const url = 'http://localhost:8080/api/notification';
  const body = {
    recipientToken: FCM_TOKEN,
    title: "Urgent Flight Update!!",
    body: "Dear Passenger, Your flight FL01123 has been detoured and will be available to board at GATE: 31 North-East at 17:05 IST",
    image: "data:image/png;base64,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",
    data: {
      key1: "value1"
    }
  };

  try {
    if(FCM_TOKEN =="") throw new Error("Invalid FCM token");
    const response = await axios.post(url, body)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    if(response){
    const data = await response.json();
    console.log('Success:', data);}
  } catch (error) {
    console.error('Error:', error);
  }
}

  return (
    <>
      <div className='App'>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <img src={abc} style={{ height: '50px', marginRight: '20px' }} />
        <h2>Flight Status App</h2>
        </div>
        <hr />
        <button onClick={sendNotification}>Send Test Notification</button>
        <FlightDashboard />
      </div>
      {/* <FlightStatus /> */}
       
    </>
  )
}

export default App
