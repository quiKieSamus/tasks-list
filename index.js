const express = require('express');
const morgan = require('morgan');
const db = require('./src/db/db');

const userModel = require('./src/models/user');
const tasksModel = require('./src/models/tasks');

const app = express();

//occupations array of objects
const ocp = require('./src/utils/occupations');

let c = 1;

app.use((req, res, next) => {
    console.log(c++);
    next();
})
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server funcionando");
});


app.get('/signUp', (req, res) => {
    res.sendFile('./public/views/signUp.html', {
        root: __dirname
    });
});

app.post('/signUp', (req, res) => {
    const username = req.body.user;
    const name = req.body.name;
    const lName = req.body.lName;
    const bDay = req.body.bDay;
    const occupation = req.body.ocp;

    const user = new userModel(username, name, lName, bDay, occupation);

    user.insertUserToDB(db);
});

app.get('/tasks', (req, res) => {
    res.sendFile('./public/views/yourTasks.html', {
        root: __dirname
    });
});

app.post('/tasks', (req, res) => {
    tasksModel.getTasks(db, res);
});

app.get("/tasks/createTask", (req, res) => {
    res.sendFile('./public/views/createTask.html', {
        root: __dirname
    });
});

app.post("/tasks/createTask", (req, res) => {
    const title = req.body.title;
    const desc = req.body.desc;
    const starts = req.body.starts;
    const ends = req.body.ends;
    let urgency = req.body.urgency;
    if (urgency === 'true') urgency = 1;
    else urgency = 0;
    
    const newTasks = new tasksModel(title, starts, ends, desc, urgency);

    newTasks.addTask(db);
});

app.post("/occupations", (req, res) => {
    res.json(ocp);
});
const port = 8080;
app.listen(port);
console.log(`App on port ${port}`);