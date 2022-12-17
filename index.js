const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Server funcionando");
});


app.get("/tasks/createTask", (req, res) => {
    res.sendFile('./public/views/createTask.html', {
        root: __dirname
    });
});

app.post("/tasks/createTask", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});
const port = 8080;
app.listen(port);
console.log(`App on port ${port}`);