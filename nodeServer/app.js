const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const tasks = [
    {
        "id":"1",
        "tasks": "get interview sceduled",
        
      },
      {
        "id":"2",
        "tasks": "get interview sceduled",
        
      }
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});
app.get('/', (req, res) => {
    res.send("hello");
  });

app.post('/api/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.json({ message: 'Task added successfully!' });
});

app.put('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  const task = req.body;
  tasks[id] = task;
  res.json({ message: 'Task updated successfully!' });
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = req.params.id;
  tasks.splice(id, 1);
  res.json({ message: 'Task deleted successfully!' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});