import React from 'react';
import './Input.css';

//what we need to pass to our input are : writing input (form) and a button
// the value, onChange and onKeypress we defined them earlier with the name and room input and already set the handler and functions
//we don'T have the message property in this specific component , we call ths message and the setMessage and sendMessage by passing them as properties in the input.js component in chat.js
//message, setMessage, and sendMessage we distructure them into the probs
const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
  </form>
)

export default Input;