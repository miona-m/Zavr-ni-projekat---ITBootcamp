import React, { useEffect, useState } from 'react';
import { getUsername } from '../utilities/forum-service';

const Profile = ({ match }) => {
    
    const [userID] = useState(match.params.user_id)
    const [user, setUser] = useState({})

    useEffect(() =>{
        getUsername(userID)
        .then(data => setUser(data.user))
    },[userID])
    

    return(
        <div className='user-profile'>
            <p><strong>Name</strong>:   {user.name}</p>
            <p><strong>Surname</strong>:   {user.surname}</p>
            <p><strong>Username</strong>:   {user.username}</p>
            <p><strong>Email</strong>:   {user.email}</p>
            {/* <img src={user.picture ? user.picture : ''} alt="user-avatar" /> */}
        </div>
    )
}

export default Profile