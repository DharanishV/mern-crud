import express from 'express'
import Task from '../Models/Tasks.js'
const taskRouter = express.Router()


taskRouter.post(
    '/create',
    async(req,res) => {
        const data = {
            description: req.body.description,
            completion: req.body.completion,
        }

        const task = new Task(data);

        try {
            await task.save();
        } catch (error) {
            console.log(error)
        }

    }
)


taskRouter.put(
    '/update',
    async (req, res) => {
        const task = {
            description: req.body.description,
            completion: req.body.completion,
        }

        const id = req.body._id;

        try {
            await Task.findByIdAndUpdate(id,data,(err,updatedData)=>{
                if(!err) res.send(`Updated data`)
                else console.log(err)
            })
        } catch (error) {
            console.log(error)
        }

    }
)


taskRouter.delete(
    '/delete/:id',
    async(req,res) => {
        const id = req.params.id;
        await Task.findByIdAndRemove(id).exec();
        res.send('Deleted');
    }
)


taskRouter.get(
    '/read',
    async (req, res) => {
        Task.find({}, (error,result)=>{
            if(error) res.send(error)
            else res.send(result)
        })
    }
)


export default taskRouter;