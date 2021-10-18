import React, { useState, useEffect } from 'react';

import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Popup from './Popup';
import axios from 'axios';


// For real time
import io from 'socket.io-client'
const socket = io('http://localhost:5000/');

const Card = ({ type, task, setTasks, alltasks }) => {

    const [popup, setPopup] = useState(false);

    const [cardTask, setCardTask] = useState(task);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/tasks/delete/${id}`)
        socket.on('task-deleted', (id) => {
            const newTasks = alltasks.filter(task => {
                return task._id !== id
            })
            setTasks(newTasks)
            console.log(newTasks)
            console.log(id)
        })
    }

    

    return (
        <div>
            {
                popup && <Popup setPopup={setPopup} 
                task={cardTask} setTasks={setTasks} 
                setCardTask={setCardTask}/>
            }
            {(type === 'card') ? (
                <div className="cards">
                    <div className="display">
                        <div className="content">
                            <strong>{cardTask.description}</strong>
                            <p>Completion: {cardTask.completion}</p>
                        </div>

                    </div>
                    <div className="btn-container">
                        <div onClick={() => setPopup(true)}>
                            <CreateIcon />
                        </div>
                        <div onClick={() => handleDelete(task._id)}>
                            <DeleteIcon />
                        </div>
                    </div>
                </div>
            ) : (
                    <div className="addcards"
                        onClick={() => setPopup(true)}>
                        <AddCircleOutlineIcon />
                    </div>
                )}


        </div>

    )
}

export default Card;
