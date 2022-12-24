const bcrypt = require('bcryptjs');

class User {
    constructor(username, password, name, lastName, age, title) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.title = title;
    }

    static addUser(dbCon, user) {
        let query = `INSERT INTO users(username, password, name, last_name, age, profession) VALUES ('${user.username}', '${bcrypt.hashSync(user.password)}', '${user.name}', '${user.lastName}', '${user.age}', '${user.title}')`;

        return new Promise((resolve, rejected) => {
            dbCon.query(query, (err, results, fields) => {
                if (err) {
                    return rejected(err);
                } else {
                    console.log("User added");
                    return resolve(results);
                }

            });

        });

    }

    static comparePassword(dbCon, username, password) {
        const query = `SELECT password FROM users where username='${username}'`;

        return new Promise((resolve, rejected) => {
            dbCon.query(query, (err, results, fields) => {
                if (err) {
                    console.log(results);
                    throw err;
                }
                if (typeof results[0] === 'undefined') {
                    return rejected("no se encontró usuario");
                } else {
                    const hash = results[0].password;
                    if (bcrypt.compareSync(password, hash)) {
                        console.log("exito");
                        return resolve(results);
                    } else {
                        console.log("contraseña errónea");
                        return rejected(results);
                    }
                }



            });
        });

    }

}


module.exports = User;