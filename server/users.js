// this file we creat helper function, manages users signing out , joining in , removing ,adding , etc...
const users = [];

//the function takes 3 params the first is an id of socket instance .
// we change the name and the room the user enters,we remove white spaces (trim) and then put it lower case.

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();


   //check if there is an existing user name
  //we go to the array and find()
  const existingUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

      //if the user doesn't exist, we create the user and it will be with an object with id , name and room  and the push it to the array of users

      const user = { id, name, room };
      users.push(user);

      return { user };
}

//we need only one param which is ID, we try to find the users with that id
// if(index !== -1)  if the user with the id is equal to the specified id , means that there is a user of that index


const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}


const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };