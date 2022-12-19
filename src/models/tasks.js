class Task {
    constructor(title, starts, ends, description, is_urgent) {
        this.title = title;
        this.starts = starts;
        this.ends = ends;
        this.description = description;
        this.is_urgent = is_urgent;
    }

    addTask(dbCon) {
        dbCon.query(`INSERT INTO tasks(title, starts, ends, description, is_urgent) values ('${this.title}', '${this.starts}', '${this.ends}', '${this.description}', '${this.is_urgent}')`, (err, results, fields) => {
            if (err) throw err;
            else console.log("tarea añadida");
        });
    }

    static getTasks(dbCon, res) {
        const query = "SELECT * FROM tasks";

        dbCon.query(query, async (err, results, fields) => {
            if (err) throw err;
            console.log("respondiendo con las tareas");
            console.log(results);
            res.json(results);
        });
    }

    static deleteTask(dbCon, id) {
        const query = `DELETE FROM tasks WHERE id='${id}'`;
        dbCon.query(query, (err, results, fields) => {
            if (err) throw err;
            else console.log(results, fields);
        });
    }
}

module.exports = Task;