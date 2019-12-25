import React, { useState } from 'react';
import { login } from '../utilities/forum-service';
import { withRouter } from 'react-router-dom';
import '../layout/layout.css'


const Login = ({setUser,history}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(){
        login({username,password})
        .then(data =>  {
            if(data.success) {
                setUser(data.user)
                history.push('/topics')
            }
            else {
                console.log(data)
                console.log('Failed to login')
            }
        })


    }

    return (
        <form className='login-form'>
            <input type="username" placeholder="Username" required onInput={e => {
                setUsername(e.target.value)
            }}/>
            <input type="password" placeholder="Password" required onInput={e => {
                setPassword(e.target.value)
            } }/>
            <input  className='login-btn' type="submit" value="Login" onClick={(e) => {
                e.preventDefault()
                handleSubmit()
            }} />
        </form>
    )
}

export default withRouter(Login)