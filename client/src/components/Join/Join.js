//useState is the hook for using state inside function based components
import React, { useState }from 'react';
//this link is used to link /chat path
import { Link } from 'react-router-dom';

import './Join.css'
//declaring hooks is always inside the functional based component
const Join = () => {
    //declaring hooks :first parameter is a variable ...... name state , a function to set the name state  and we are passing as an intial value whcih is usestate
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
          <div className="joinInnerContainer">
            <h1 className="heading">JOIN</h1>

            {/* when typing event will be triggerd to change values */}
            <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /> </div>
            <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /> </div>

            {/* when clicked will fire the (to) property and when no name and room we prevent the button from being clicked
            to /chat component, we pass parameters to url by using ? and the second with & */}

            <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
              <button className={'button mt-20'} type="submit">Sign In</button>
            </Link>
          </div>
        </div>
      );
}

export default Join;