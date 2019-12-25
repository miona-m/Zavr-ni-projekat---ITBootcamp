const BASEURL = 'https://coetus.herokuapp.com'
const API = '/api/forum'
const USERS = '/users'
const MESSAGE = '/message'
const TOPICS ='/topics'

function login(user){
    let res = fetch(`${BASEURL}${API}${USERS}`,{
        headers:{
            'Content-Type':'application/json; charset=utf-8' 
        },
        method:'POST',
        body:JSON.stringify(user)
    }).then(res => res.json())
    return res
}

function register(user){
    return fetch(`${BASEURL}${API}${USERS}`,{
        headers:{
            'Content-Type':'application/json; charset=utf-8'
        },
        method:'PUT',
        body:JSON.stringify(user)
    }).then(res => res.json())
}

function getUsername(id){
    return fetch(`${BASEURL}${API}${USERS}/${id}`)
            .then(res => res.json())
}

function getAllTopics(){
    let res = fetch(`${BASEURL}${API}${TOPICS}`).then(response => response.json()
        , (error) => {
            console.log(error);
        });
    return res;
}

function getAllMessages(id){
    let res = fetch(`${BASEURL}${API}${MESSAGE}/${id}`).then(response => response.json()
        , (error) => {
            console.log(error);
        });
    return res;
}

function addMessage(username, message, topic_id) {
    return fetch(`${BASEURL}${API}${MESSAGE}/`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({
            username: username,
            message: message,
            topic_id: topic_id
        })
    }).then(response => response.json(), (error) => {
        console.log(error);
    })

}

function addNewTopic (user_id, title) {
    return fetch(`${BASEURL}${API}${TOPICS}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify( user_id, title)
    }).then(response => response.json(), (error) => {
        console.log(error);
    })

}

export {
    login,
    register,
    getUsername,
    getAllTopics,
    getAllMessages,
    addMessage, 
    addNewTopic
}
