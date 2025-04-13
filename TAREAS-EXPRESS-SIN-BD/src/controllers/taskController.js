const taskModel = require("../models/taskModel");
//obtener todas las tareas
const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.getTasks();
        res.json(tasks);
    }catch (error){
        res.status(500).json({error: error.message});
    }
};
const getTaskById = async (req, res) => {
    try{
        const task = await taskModel.getTasksById (req.params.id);
        if (!task){
            return res.status(404).json({ error: "Tarea no encontrada" });
        }
        res.json(task);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
};
const createTask = async (req, res) => {
    try{
        const newTask = await taskModel.createTask(req.body)
        res.status(201).json(newTask)
    }catch (error){
        res.status(500).json({ error: error.message });
    }
};
const updateTask = async (req, res) => {
    try {
        const updateTask = await taskModel.updateTask
        (req.params.id, req.body);
    if (!updateTask){
        return res.status(404).json({ error: "Tarea no encontrada" });
    }
        res.json(updateTask);
    }catch (error) {
        res.status(500).json({ error: err.message });
    }
};
const deleteTask = async (req, res) => {
    try {
        const deleteTask = await taskModel.deleteTask
        (req.params.id);
    if (!deleteTask){
        return res.status(404).json({ error: "tarea no encontrada" });
    }
        res.json({message:"tarea eliminada",tarea_eliminada:deleteTask});
    }catch (error) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};