const send = document.getElementById("send");

send.addEventListener('click', () => {
    const user = document.querySelector(".user").value;
    const pwd = document.querySelector(".password").value;


    const body = {
        username: user,
        password: pwd
    };

    const jsonBody = JSON.stringify(body);

    fetch('http://localhost:8080/login', {
        method: "POST",
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: jsonBody
    })
        .then((resolve) => {
            return resolve.json();
        })
        .then((data) => {
            if (data.state) {
                location.href = data.link;
                return true;
            }  
            
            const loginErr = document.querySelector(".login-err");
            console.log("login error");

            loginErr.style.display = "block";
            loginErr.style.color = "red";
        })
        .catch((err) => {
            console.log(err);
        })
});