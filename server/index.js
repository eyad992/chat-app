//creating the server and require the dependencies
//http is build in node module 
const http = require('http');
const express = require('express');

const socketio = require('socket.io');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require ('./users');
//we import (require) the router from ./router
const router = require('./router');

const app = express();

//initialize the server and pass the app that we Initialized from express
const server = http.createServer(app);

//the instance of the socketio and pass ther server 
const io = socketio(server);

//call the router as a middleware
app.use(router);
app.use(cors());


//will change at the deployment
const PORT = process.env.PORT || 5000 

//read documentation of socketio
// the disconnect will be inside the on connection because we are managing just one socket
io.on('connect', (socket) => {
    //we specify the socket event we created on client side, we recieve in the backend , we get access now in the backend
    //we get the name and room in the console in server after running it with npm start
    //we can also pass a callback with socket. on and socket.emit, we can trigger some response and error handling with the callback, see picture in repo
    socket.on('join', ({ name, room }, callback) => {
      
      // addUser function return just two things ,  and object that has a user property and a and object that has an error property  
      // addUser recieves id, name and room . the id is a specific instance from the socket
      // error message is dynamicaly comming based on specific error
      //if there is a user we will be output the error and will be out of the function
      //if there is no error we will be calling another build in socket method which will be join
      const { error, user } = addUser({ id: socket.id, name, room });
      if(error) return callback(error);
      socket.join(user.room);

      // admin generated messages , system messages like when somone joins or leaves
      //after joining we can print some messages by emitting some events
      //we specify the payload of the event by specify user and messsage
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      //broadcast is used to send message to everyone besides thespecific user
     // we use user.room because we are targeting a specific room
     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });


     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

      // ??????
      callback();
    });

   //event for user generated messages (sendMessage) meanwhitle the admin generated messages are message like above.
   //on the admin generated messages we emitted even from the backend to the fronend, but with the user generated messages , we expect the event from the frontend.
   //on function in socket takes two params


// send message when user leaves 
socket.on('sendMessage', (message, callback) => {

        //get user who sent the message
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });


        //so we can do something after the message is sent in the frontend
        callback();
    });

    //remove user 
    socket.on('disconnect', () => {
        //remove user who left    
        const user = removeUser(socket.id);

      //send a message to inform the users in room of the user who left
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

    }
  })
});




//we pass the port and a callback function
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});