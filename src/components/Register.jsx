import React, { useState, useEffect } from 'react';
import { register } from '../utilities/forum-service';

const Register = ({setUser,history}) => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pwConfirm,setPwConfirm] = useState('')
    const [validPw, setValidPw] = useState(false)
    const [isSame, setIsSame] = useState(false)

    useEffect(() => {
        function isValidPw(){
            if((/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g).test(password)){
                setValidPw(true)
            }
            else{
                setValidPw(false)
            }
        }
        console.log(password)
        isValidPw()
    },[password])

    useEffect(() => {
        setIsSame(pwConfirm === password)
        console.log(pwConfirm === password)
    },[pwConfirm,password])

    function handleSubmit(){
        if(!validPw || !isSame){
            console.log('Potato')
            return
        }
        register({name,surname,username,email,password})
        .then(data =>  {
            console.log(data)
            if(data.success) {
                setUser(data.user)
               history.push('')
            }
            else console.log('Registration Error')
        })


    }

    return (
        <form className='register-form'>
            <input type="text" placeholder="Name" required onInput={e => {
                setName(e.target.value)
            }}/>
            <input type="text" placeholder="Surname" required onInput={e => {
                setSurname(e.target.value)
            }}/>

            <input type="text" placeholder="Username" required onInput={e => {
                setUsername(e.target.value)
            }}/>  
            <input type="email" placeholder="Email" required onInput={e => {
                setEmail(e.target.value)
            }}/>
            <input type="password" placeholder="Password" required onInput={e => {
                setPassword(e.target.value)
            } }/>
            <input type="password" placeholder="Confirm Password" required onInput={e => {
                setPwConfirm(e.target.value)
            }} />
                

            <input className='register-btn' type="submit" value="Register" onClick={e => {e.preventDefault();handleSubmit()}} />
        </form>
    )
}

export default Register