import React, { useEffect, useState } from 'react';
import { getAllTopics, addNewTopic, addMessage } from '../utilities/forum-service';

const TopicList = ({ match, history, user }) => {
    
    const [topicID] = useState(match.params.topic_id)
    const [topics, setTopic] = useState([])
    const [title, setTopicTitle] = useState('')
    const [message, setFirstMessage] = useState('')
    
    let user_id = user.user_id



    useEffect(() =>{
        getAllTopics(topicID)
        .then(data => {
            setTopic(data.topics)
    })
    },[topicID, history])

    function addTopic(){
        console.log(user_id)
        addNewTopic({user_id, title})
        .then(data => {
            if(data.success){
                let top_id=data.topic.topic_id
                addMessage(user.username, message, data.topic.topic_id).then(data => {
                    if(data.success){
                        console.log(data)
                        history.push(`/message/${top_id}`)
                        }else console.log('error')
                }
                )
            }
            else console.log (data) 
        }
        )
    }

    
    return (
        <div className='topic-list'>
            <h1>Topics:</h1>
            {topics.map((topics) => <h2 key= {topics.topic_id} onClick={() => {
                history.push(`/message/${topics.topic_id}`)
            }}> {topics.title.toString()} </h2>)}
            <form>
                <input type= "text" className="new-topic-title" placeholder="Title" onInput={e => {setTopicTitle(e.target.value)}}></input>
                <textarea className="new-topic-message" type="text" placeholder="First message on this topic" onChange={e => {setFirstMessage(e.target.value)}}></textarea>
                <input className="add-msg-btn" type="submit" onClick={e => {e.preventDefault();addTopic()}}></input>
            </form>
        </div>
    )
}

export default TopicList