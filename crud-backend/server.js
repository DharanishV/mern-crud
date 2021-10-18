import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose' 
import taskRouter from './Routers/taskRouter.js'
import {createServer} from 'http'
import  * as io from 'socket.io'

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
const server = createServer(app)
server.listen(port, () => console.log(`Server is running at ${port}........`))
app.get("/",(req,res) => res.send("Hurray! server is running..."))


// Step - 2: Now connect with MongoDB

const url = "mongodb+srv://admin19:v19dharanish@cluster0.6vpml.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


// Step - 3: Now create models in Model folder

// Step -4: Now create routes (In routers folder and use here)

app.use("/tasks", taskRouter);


// Step - 5: Now implement socket.io [Check userRouter]


const socketIo = new io.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});;

// socketIo.on('connection', (socket) => {
//     console.log('Socket IO is connected.....');
// });


const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log("MongoDB databse connected.");

    const changeStream = connection.collection('tasks').watch({ fullDocument: 'updateLookup' });

    changeStream.on('change', (change)=>{
        switch(change.operationType){
            case 'insert':
                const task = {
                    _id: change.fullDocument._id,
                    description: change.fullDocument.description,
                    completion: change.fullDocument.completion,
                }
                socketIo.emit('task-added', task)
                break;
            
            case 'delete':
                socketIo.emit('task-deleted', change.documentKey._id)
                break;

            case 'update':
                const updatedTask = {
                    _id: change.fullDocument._id,
                    description: change.fullDocument.description,
                    completion: change.fullDocument.completion,
                }
                socketIo.emit('task-updated',updatedTask)
                break;
        }
    })

})



