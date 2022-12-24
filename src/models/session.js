class Session {

    //method to check whether a user has logged on and has 
    //been pushed to the array that contains all users
    static isLoggedIn(arr, user) {
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] === user) return {
                state: true
            };
        }
        return {
            state: false,
            reason: "User not found."
        }
    }

    static getUsersLoggedIn(arr) {
        return arr;
    }

    static addUser(arr, user) {
        if (this.isLoggedIn(arr, user).state) {
            return false;
        } else {
            arr.push(user);
            return true;
        }
    }
}

module.exports = Session;