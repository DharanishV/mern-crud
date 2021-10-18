import React, {useEffect, useState} from 'react'
import "./Home.css"

// For fetching data
import axios from 'axios'

import Card from './Card';

const Home = () => {

    const [tasks, setTasks] = useState()

    useEffect(()=>{
        axios.get('http://localhost:5000/tasks/read')
        .then(res => {
            setTasks(res.data)
        })
    },[])


    console.log(tasks);

    return (
        <div>
            <div className="container">
                {tasks && tasks.map(task => (
                    <Card type="card" key={task._id} 
                    task={task} alltasks={tasks} 
                    setTasks={setTasks}/>
                ))}
                
                <Card type="add" setTasks={setTasks}/>
            </div>
        </div>
    )
}

export default Home;
