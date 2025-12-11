const Task = require('../models/Task');

// In-memory storage as fallback when MongoDB is not available
let inMemoryTasks = [
  { id: 1, title: 'Sample Task 1', description: 'This is a demo task', completed: false, createdAt: new Date() },
  { id: 2, title: 'Sample Task 2', description: 'Another demo task', completed: true, createdAt: new Date() }
];
let nextId = 3;

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    if (Task.db && Task.db.readyState === 1) {
      const tasks = await Task.find().sort({ createdAt: -1 });
      res.json(tasks);
    } else {
      // Sort in-memory tasks by createdAt descending to match MongoDB behavior
      const sortedTasks = [...inMemoryTasks].sort((a, b) => b.createdAt - a.createdAt);
      res.json(sortedTasks);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single task
exports.getTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (Task.db && Task.db.readyState === 1) {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } else {
      const task = inMemoryTasks.find(t => t.id === parseInt(id));
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create task
exports.createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    if (Task.db && Task.db.readyState === 1) {
      const task = new Task({ title, description, completed });
      const newTask = await task.save();
      res.status(201).json(newTask);
    } else {
      const newTask = {
        id: nextId++,
        title,
        description: description || '',
        completed: completed || false,
        createdAt: new Date()
      };
      inMemoryTasks.push(newTask);
      res.status(201).json(newTask);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (Task.db && Task.db.readyState === 1) {
      const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } else {
      const taskIndex = inMemoryTasks.findIndex(t => t.id === parseInt(id));
      if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
      }
      inMemoryTasks[taskIndex] = { ...inMemoryTasks[taskIndex], ...req.body };
      res.json(inMemoryTasks[taskIndex]);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    if (Task.db && Task.db.readyState === 1) {
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } else {
      const taskIndex = inMemoryTasks.findIndex(t => t.id === parseInt(id));
      if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
      }
      inMemoryTasks.splice(taskIndex, 1);
      res.json({ message: 'Task deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
