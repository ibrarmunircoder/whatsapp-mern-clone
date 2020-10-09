import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import axios from '../apis/axios';
import Pusher from 'pusher-js';
import { useStateValue } from '../stateProvide';

// MUI
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchIcon from '@material-ui/icons/Search';
import { Avatar, IconButton } from '@material-ui/core';


function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/room/sync');
            setRooms(response.data);
        }

        fetchData();
    }, []);


    useEffect(() => {
        const pusher = new Pusher('18144b6d7169d55d17c2', {
          cluster: 'mt1'
        });
    
        const channel = pusher.subscribe('room');
        channel.bind('inserted', (newRoom) => {
          // alert(JSON.stringify(newMessage));
          setRooms([...rooms, newRoom])
        });
    
          // clean up function
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        }
      }, [rooms]);
    

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchIcon />
                    <input type="text" name="term" placeholder="Search or Start new Chat"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room => {
                    return (
                        <SidebarChat key={room._id} id={room._id} name={room.name} />
                    );
                })}
            </div>
        </div>
    )
}

export default Sidebar
