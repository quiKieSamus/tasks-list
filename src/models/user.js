class User {
    constructor(username, name, lastName, age, title) {
        this.username = username;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.title = title;
    }

    insertUserToDB(dbCon) {
        let query = `INSERT INTO users(username, name, last_name, age, profession) VALUES ('${this.username}', '${this.name}', '${this.lastName}', '${this.age}', '${this.title}')`;

        dbCon.query(query, (err, results, fields) => {
            if (err) {
                console.log(err)
                console.log('User not added');
            } else {
                console.log("User added");
                dbCon.end();
            }
        });

    }
}

module.exports = User;