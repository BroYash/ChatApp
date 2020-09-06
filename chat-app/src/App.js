import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar'
import Chat from './Chat'
import Pusher from 'pusher-js'
import axios from "./axios"

function App() {
  const [messages, setMessages] =  useState([]);

  useEffect(() =>{
    axios.get('/messages/sync')
      .then(response => {
        setMessages(response.data)
      })

  },[])

  useEffect(() =>{
    var pusher = new Pusher('878b3abaa9e676987b4b', {
      cluster: 'ap1'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (NewMessage) => {
      alert(JSON.stringify(NewMessage));
      setMessages([...messages,NewMessage])
    });

    return () =>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages])

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar></Sidebar>
        <Chat messages = {messages}></Chat>
      </div>
    </div>
  );
}

export default App;
