import React, { useEffect, useState } from 'react';
import { getAllMessages, addMessage, getAllTopics } from '../utilities/forum-service';

const TopicMessageList = ({ match, history, user }) => {
    console.log(match)
    const [topic,setTopic] = useState({})
    const [messageID] = useState(match.params.message_id)
    const [messages, setMessages] = useState([])
    const [message, setNewMessage] = useState('')


    let username = user.username
    useEffect(()=>{
        getAllTopics().then(data => {
            if(data.success){
                setTopic(data.topics.find(x=>x.topic_id===messageID));
            }
        
        
        })
    }
    ,[messageID])

    useEffect(() => {
        getAllMessages(messageID)
            .then(data => {
                console.log(data);
                setMessages(data.messages)
            })
    }, [messageID])

    function addNewMessage(){
        console.log(username,message)
        addMessage(username, message, messageID)
        .then(data => {
            if(data.success){
                console.log(data)
                getAllMessages(messageID)
                .then(data => {
                    setMessages(data.messages)
                })
            } else console.log(data)
        })
    }

    return (
        <div className='topic-messages'>
            <h2>Tema: {topic.title} </h2>  
            <h1>Poruke:</h1>
            {messages.map((messages) =>
                    <p key={messages.message_id}>{messages.username}: {messages.message} {new Date(messages.timestamp).toLocaleTimeString({ hour12: true })} </p>
                    )}
            <form>
                <textarea className="new-message-input" type="text" placeholder="Type your message here" onChange={e => {setNewMessage(e.target.value)}}></textarea>
                <input className="add-msg-btn" type="submit" onClick ={e => {e.preventDefault();addNewMessage()}}></input>
            </form>
        </div>
    )
}

export default TopicMessageList