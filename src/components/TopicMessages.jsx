import React, { useEffect, useState } from 'react';
import { getAllMessages, addMessage, getAllTopics } from '../utilities/forum-service';
import { Link, withRouter } from 'react-router-dom'

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
        console.log(username, message)
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
            <h2>Topic: {topic.title} </h2>  
            <h1>Messages:</h1>
            {messages.map((messages) => { console.log('a', messages.username, messages.message, messages.timestamp);
            return <p key={messages.message_id}><Link className='link' to={`/profile/${messages.user_id}`}>{messages.username}</Link>: {messages.message.toString()} <span className='timestamp'>{new Date(messages.timestamp).toLocaleTimeString({ hour12: true })}</span> </p>
                    })}
            <form>
                <textarea className="new-message-input" type="text" placeholder="Type your message here" onChange={e => {setNewMessage(e.target.value)}}></textarea>
                <input className="add-msg-btn" type="submit" onClick ={e => {e.preventDefault();addNewMessage()}}></input>
            </form>
        </div>
    )
}

export default withRouter (TopicMessageList)