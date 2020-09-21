import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/Message';

import './Messages.css';


//we utilize react-scroll-to-bottom
//we loop through all the messages ,but we dont have access to messages here
//we go to chat.js , we utilize the messages by sending the messages as  property
//after propertiesing thee messages in chat js w loop through them here
const Messages = ({ messages, name }) => (
    //we loop through the messages with map 
    //for each message w generate a div with a key of index
    //we render the message in the div which is a seperate component
    //we provide the message component with some parameters :  message={message} name={name}
    //both of them are coming from the probs in the  const Messages = ({ message, name }) 
    //we pass a name do Differentiat the messages from the current user and the others in the room  
  <ScrollToBottom className="messages">
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
  </ScrollToBottom>
);

export default Messages;