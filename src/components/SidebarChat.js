import React, { useState, useEffect } from 'react';
import './SidebarChat.css';
import axios from '../apis/axios';
import { Link } from 'react-router-dom';

// MUI
import { Avatar } from '@material-ui/core';


function SidebarChat({ addNewChat, id, name }) {

    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        
        async function fetchData(){
            const response = await axios.get(`/messages/sync/${id}`);
            console.log(response.data);
            setMessages(response.data);
            }
        
            fetchData();
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const onNewChat = (e) => {
        const roomName = prompt("Please Add a new Room");

        axios.post('/room/new', {
            name: roomName
        })
        .then(() => {
            console.log("Room Created Successfully!!");
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        !addNewChat ? (
            <Link to={`/rooms/${id}`}>
                <div className="sidebarChat">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                    <div className="sidebarChat__info">
                        <h2>{name}</h2>
                        <p>{messages[messages.length - 1]?.message}</p>
                    </div>
                </div>
            </Link>
        ) : (
            <div onClick={onNewChat} className="sidebarChat">
                <h2>Add New Chat</h2>
            </div>
        )
    )
}

export default SidebarChat
