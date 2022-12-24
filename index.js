const express = require('express');
const morgan = require('morgan');
const db = require('./src/db/db');

const userModel = require('./src/models/user');
const tasksModel = require('./src/models/tasks');
const sessionModel = require('./src/models/session');

const app = express();

//occupations array of objects
const ocp = require('./src/utils/occupations');

let c = 1;

let usersLoggedIn = [];

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



app.get('/login', (req, res) => {
    res.sendFile('./public/views/login.html', {
        root: __dirname
    });
});


//getting all users that have logged in
app.post('/login/users', (req, res) => {
    res.json(sessionModel.getUsersLoggedIn(usersLoggedIn));
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    return new Promise((resolve, reject) => {
        userModel.comparePassword(db, username, password)
            .then((resolve) => {
                if (resolve) {
                    sessionModel.addUser(usersLoggedIn, username);
                    res.json({
                        state: true,
                        link: `http://localhost:8080/tasks/${username}`
                    });
                }
            })
            .catch((reject) => {
                if (reject) {
                    res.json({
                        state: false,
                        link: "http://localhost:8080/login"
                    });
                }
            });
    });
});

app.get('/signUp', (req, res) => {
    res.sendFile('./public/views/signUp.html', {
        root: __dirname
    });
});

app.post('/signUp', (req, res) => {
    const username = req.body.user;
    const password = req.body.password;
    const name = req.body.name;
    const lName = req.body.lName;
    const bDay = req.body.bDay;
    const occupation = req.body.ocp;

    const user = new userModel(username, password, name, lName, bDay, occupation);

    userModel.addUser(db, user)
        .then((resolve) => {
            sessionModel.addUser(usersLoggedIn, username);
            res.json({
                state: "true",
                link: `http://localhost:8080/tasks/${username}`

            });
        })
        .catch((reject) => {
            res.json({
                state: "false",
                reason: reject.sqlMessage,
                errCode: reject.errno,
                link: "http://localhost:8080/signUp"
            });
        })
});

app.get('/tasks/:username', (req, res) => {
    if (sessionModel.isLoggedIn(usersLoggedIn, req.params.username).state) {
        res.sendFile('./public/views/yourTasks.html', {
            root: __dirname
        });
    } else {
        res.send("You're not logged in");
    }

});

app.post('/tasks/:username', (req, res) => {
    const username = req.params.username;
    tasksModel.getUserTasks(db, res, username)
        .then((resolve) => {
            res.json({
                user: username,
                results: resolve
            });
        })

});

app.get("/tasks/:username/createTask", (req, res) => {
    if (sessionModel.isLoggedIn(usersLoggedIn, req.params.username).state) {
        res.sendFile('./public/views/createTask.html', {
            root: __dirname
        });
    } else {
        res.send("you're not logged in");
    }


});

app.post("/tasks/:username/createTask", (req, res) => {

    const user = req.params.username;
    const title = req.body.title;
    const desc = req.body.desc;
    const starts = req.body.starts;
    const ends = req.body.ends;
    let urgency = req.body.urgency;
    if (urgency === 'true') urgency = 1;
    else urgency = 0;


    const newTasks = new tasksModel(title, starts, ends, desc, urgency, user);

    newTasks.addTask(db)
        .then((resolve) => {
            res.json({
                link: `http://localhost:8080/tasks/${user}`
            })
        })
        .catch((rejeced) => {
            res.send("Task not created");
        });
});



app.delete("/tasks/deleteTask/:id", (req, res) => {
    tasksModel.deleteTask(db, req.params.id);
});

app.patch("/tasks/updateTask", (req, res) => {
    console.log(req.body);
    tasksModel.updateTask(db, req.body);
});

app.post("/occupations", (req, res) => {
    res.json(ocp);
});
const port = 8080;
app.listen(port);
console.log(`App on port ${port}`);