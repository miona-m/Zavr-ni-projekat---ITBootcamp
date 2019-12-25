import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Register from '../components/Register';
import Login from '../components/Login';
import Profile from '../components/UserProfile';
import TopicList from '../components/TopicList';
import TopicMessageList from '../components/TopicMessages';

const Content = ({ setUser, user }) => {
    return(
        <main className='main'>
        <Switch>
            <Route path='/register' component={(props) => <Register setUser={setUser} {...props}/>} />
            <Route path='/login' component={(props) => <Login setUser={setUser} {...props}/>} />
            <Route path='/profile/:user_id' component={Profile} />
            <Route path='/topics' component={(props) => <TopicList user={user} {...props}/>}  />
            <Route path='/message/:message_id' component={(props) => <TopicMessageList user={user} {...props}/>} /> 
        </Switch>

        </main>
    )
}

export default Content