class Task {
    constructor(title, starts, ends, description, is_urgent, user) {
        this.title = title;
        this.starts = starts;
        this.ends = ends;
        this.description = description;
        this.is_urgent = is_urgent;
        this.user = user;
    }

    addTask(dbCon) {
        return new Promise((resolve, rejected) => {
            dbCon.query(`INSERT INTO tasks(title, starts, ends, description, is_urgent, user) values ('${this.title}', '${this.starts}', '${this.ends}', '${this.description}', '${this.is_urgent}', '${this.user}')`, (err, results, fields) => {
                if (err) {
                    rejected(false);
                    throw err;
                };
                return resolve(true)
            });
        });
    }

    static getAllTasks(dbCon, res) {
        const query = "SELECT * FROM tasks";

        dbCon.query(query, (err, results, fields) => {
            if (err) throw err;
            console.log("respondiendo con las tareas");
            console.log(results);
            res.json(results);
        });
    }

    static getUserTasks(dbCon, res, user) {
        const query = `SELECT * FROM tasks WHERE user='${user}'`;
        return new Promise((resolve, rejected) => {
            dbCon.query(query, (err, results, fields) => {
                if (err) rejected("Fallo");
                resolve(results);
            });
        });

    }

    static deleteTask(dbCon, id) {
        const query = `DELETE FROM tasks WHERE id='${id}'`;
        dbCon.query(query, (err, results, fields) => {
            if (err) throw err;
            else console.log(results, fields);
        });
    }

    static updateTask(dbCon, items) {
        const query = `UPDATE tasks 
                        SET title='${items.title}', 
                        starts = '${items.starts}',
                        ends = '${items.ends}',
                        description = '${items.desc}'
                        WHERE id='${items.id}'`;

        dbCon.query(query, (err, results, fields) => {
            if (err) throw err;
            console.log("modified");
        });
    }


}


module.exports = Task;