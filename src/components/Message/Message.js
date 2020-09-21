import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';


//massage and name are paramters we passed them from the message component in messages.
//message was an object that had user and text , we are looking for the text
const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
    //if this is true we render a mesage that is blue and in right side it is sent by the current user

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

      //if it is sent by the current user we render

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (         
          //if it is not sent by the current user we render here
          //the name of the user beside every message
          //we dont need to use trimmedname because because we have the user from the messages parameter data
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;