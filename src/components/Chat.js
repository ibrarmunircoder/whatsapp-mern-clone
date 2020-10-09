import React, { useState, useEffect } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import axios from '../apis/axios';
import firebase from 'firebase';
import Pusher from 'pusher-js';
import { useStateValue } from '../stateProvide';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { Avatar, IconButton } from '@material-ui/core';

function Chat() {

    const { roomId } = useParams();
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();


  useEffect(() => {
    const pusher = new Pusher('18144b6d7169d55d17c2', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('message');
    channel.bind('inserted', (newMessage) => {
      // alert(JSON.stringify(newMessage));
      console.log(newMessage);
      setMessages([...messages, newMessage])
    });

      // clean up function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);


    useEffect(() => {
        if(roomId){
            axios.get(`/room/${roomId}`)
                .then(response => {
                    setRoomName(response.data.name);
                })
                .catch(e => console.log(e));

            async function fetchData(){
                const response = await axios.get(`/messages/sync/${roomId}`);
                console.log(response.data);
                setMessages(response.data);
                }
            
                fetchData();
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const onInputChange = (e) => {
        setInput(e.target.value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(roomId) {
            axios.post('/messages/new', {
                message: input,
                name: user.displayName,
                room: roomId
            })
            .then(() => {
                return;  
            })
            .catch(err => console.log(err.message));
        }
        setInput("");
    }

    dayjs.extend(relativeTime);
    return (
        <div className="chat">
            {/* Chat header */}
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>{messages.length > 0 ? dayjs(new Date(messages[messages.length - 1]?.timestamp).toUTCString()).fromNow() : "Offline"}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            {/* Chat Body */}
            <div className="chat__body">
                {messages.map(message => {
                    return (
                        <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">
                                {new Date(message.timestamp).toUTCString()}
                            </span>
                        </p>
                    )
                })}
            </div>

            {/* footer */}
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input type="text" name="message" placeholder="Type a message" onChange={onInputChange} value={input}/>
                    <button onClick={onSubmitForm} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
