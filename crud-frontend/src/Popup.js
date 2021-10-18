import React, { useState, useEffect } from 'react'
import CancelIcon from '@material-ui/icons/Cancel';

// For real time
import io from 'socket.io-client'


// For uploading data
import axios from 'axios'

const socket = io('http://localhost:5000/');

const Popup = ({ setPopup, task, setTasks, setCardTask }) => {

    
    const [data, setData] = useState({
        description: '',
        completion: '',
    });

    useEffect(() => {
        if(task) setData(task);
    }, [])


    const addTask = () => {
        
        const uData = {
            description: data.description,
            completion: data.completion,
        }

        
        // Now add user data using axios
        axios.post("http://localhost:5000/tasks/create", uData)

        // Making realtime using Socket.io
        socket.once('task-added', newData => {
            console.log(newData)
            setTasks((task) => ([...task, newData]))
        })
        
        
        setPopup(false)
    }



    const updateTask = () => {
        const uData = {
            description: data.description,
            completion: data.completion,
        }
        axios.put("http://localhost:5000/tasks/update",uData)

        socket.once('task-updated', (updatedData) => {
            setCardTask(updatedData)
        })

        setPopup(false)
    }

    return (
        <div className="pop-up">
            <div className="input-box">
                <CancelIcon onClick={() => setPopup(false)} className="cross-btn" />
                <h3>Enter task details:</h3>
                <input type="text"
                    value={data.description}
                    onChange={(e) => setData( prevstate => ({
                        ...prevstate,
                        name: e.target.value
                    }))}
                />
                <input type="text"
                    value={data.completion}
                    onChange={(e) => setData(prevstate => ({
                        ...prevstate,
                        desc: e.target.value
                    }))}
                />
                {!task ? (
                    <button onClick={addTask}>
                        Add Task
                    </button>
                ): (
                        <button onClick={updateTask}>
                            Update Task
                        </button>
                )}
                
            </div>
        </div>
    )
}

export default Popup;
