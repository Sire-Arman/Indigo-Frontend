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

  // onNewToken(messaging, async () => {
  //   try {
  //     const newToken = await getToken(messaging, { vapidKey: "YOUR_VAPID_KEY" });
  //     if (newToken) {
  //       // Send the new token to your server.
  //       setFCM_TOKEN(newToken);
  //       console.log("FCM Token refreshed:", newToken);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while retrieving refreshed token. ", error);
  //   }
  // });
  
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
    image:"",
    data: {
      key1: "value1"
    }
  };
  console.log(body);
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
