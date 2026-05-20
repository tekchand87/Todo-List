const taskModel = require('../models/task.model')

async function addTask(req,res){

  const {task} = req.body
  
  const newT = await taskModel.create({
    task
  }) 
  res.status(201).json({
    check : {
      task : newT.task,
      id : newT.id
    }
    //  message : "Task is Added"
   
  })
}
async function getAllTask(req,res){
  try{
    const tasks = await taskModel.find()
    res.status(200).json({
      count : tasks.length,
      tasks : tasks
    })
  }
  catch(err){
    res.status(500).json({
      error : err.message
    })
  }
}
async function deleteTask(req,res){
  const {id } = req.params
  try{
    const deletedTask = await taskModel.findByIdAndDelete(id)
    if(!deletedTask){
      return res.status(404).json({message : "Task not found"})
    }
    res.status(200).json({
      message : "Delete task successfully",
      deleteTask
    })
  }
  catch(err){
    res.status(500).json({error : err.message})
  }  
  
}
module.exports = {
  getAllTask,
  addTask,
  deleteTask
}