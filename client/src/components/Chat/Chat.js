// the most important of sockit io logic will be handled

//useEffect is a hook lets use lifecycle methods inside function component 
// see documentation of react
import React, {useState, useEffect } from 'react';

// this module will help us retriving data from the url 
import queryString from 'query-string';

import io from 'socket.io-client';
import './Chat.css';
import TextContainer from '../TextContainer/TextContainer';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages'
// we created an empty variable stored out of component to use it later
let socket;

//location comes from react router and gives a prob called location , with it we get a URL back
const Chat = ({ location }) => {
    // because we are going to use room and name also here we specify them as state 
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const ENDPOINT = 'https://chat--application1.herokuapp.com/';

    useEffect(() => {
        //the const had the name data, we distructure the data into what we have which are name and room 
        const { name, room } = queryString.parse(location.search);

        //when we get our first connection we set that socket and we pas an endpoit of the server we defined it above
        socket = io(ENDPOINT);

        //those are the setState for the state we specify before defining the useEffect 
        setName(name);
        setRoom(room);

        //we emit events from clientside socket , we pass it to the backend to recognize it 
        //join is the event we will creat (on join) we pass and object with the {name and room};
        //{name,room}); are specified above on setName and setRoom
        socket.emit('join', { name,room }, () => {

        });

        //to finish the first useEffect hook we need to provide the return function
        //it is used to unmounting, to diconect effects,
        // we provide a function , inside it we emit a disconnect event. we have an event on the server side we emit it in client side
        return () => {
            socket.emit('disconnect');

            //it will turn this one instence off
            socket.off();
        }

        //the requsets were happening two times, we needed to specify when our useEffect function is being called, we do that by passing an array.
        // the values we are going to pass in are the ENDPOINT, and the location.search.
        //Only when these two values change we need to render the useEffect
    }, [ENDPOINT, location.search]);

    //this useEffect is for handeling messages, that we defined them on the backend side
    useEffect(() => {

        //indexjs server side, line 45
        socket.on('message', (message) => {

            //adding every message from admin or anyone else to messagess array
            setMessages([...messages, message])
        });
        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
        //we want to run the useEffect only when messages array changes
    }, [messages]);


    //function for sending messages 

    const sendMessage = (event) => {
        event.preventDefault();

        //emit listener is in indexjs in server line 58 it listens to the sendmessage event and send it to the room
        //the callback is to set empty string after sending messages
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(' '));
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
          <div className="container">
   
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        <TextContainer users={users}/>
        </div>
    )
}

export default Chat;