import mongoose from 'mongoose';


// Now create a Schema

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    completion: {
        type: String,
        required: true
    },
   
})



// Now create a model

const Task = mongoose.model("tasks", TaskSchema);

export default Task;