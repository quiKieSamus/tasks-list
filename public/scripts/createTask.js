const send = document.getElementById('send');


const hostUrl = "http://localhost:8080";

////this can change, check your computer's ip
const networkUrl = "http://192.168.0.189:8080";

fetch(`${hostUrl}/login/users`, { method: "POST" })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        let user;
        for (let i = 0; i < data.length; i++) {
            if (location.href.search(data[i])) user = data[i];
            else return;
        }
        console.log(user);
        send.addEventListener('click', () => {
            const title = document.querySelector('#title').value;
            const desc = document.querySelector('#desc').value;
            const starts = document.querySelector('#starts').value;
            const ends = document.querySelector('#ends').value;
            const urgencyTrue = document.querySelector('#yes').value;
            const urgencyFalse = document.querySelector('#not').value;
            let urgency = false;
            if (!urgencyTrue) {
                urgency = urgencyFalse
            }
            urgency = urgencyTrue;

            const data = {
                title: title,
                desc: desc,
                starts: starts,
                ends: ends,
                urgency: urgency,
            };
            console.log(data);

            const fetchParams = {
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(data),
                method: "POST"
            };


            /*
                fetch can be used to make http requests
                in this case we do a post request to the server
                sending data on the notes to add
        
                in this case we are sending a json
                it is important that the content-type header is set to 
                "application/json; charset=UTF-8"
                Since its a JSON the body of the request needs to have 
                a JSON NOT A JS OBJECT (which is one of the reasons 
                it took me so long to fix
                And of course, for it to be a post request you gotta 
                first set the method to post
                
                in this example we store all configurations in an object called fetchParams which, at the time of writing this text, is above this comment)
            */

            fetch(`${hostUrl}/tasks/${user}/createTask`, fetchParams)
                .then((resolve) => {
                    return resolve.json();
                })
                .then((data) => {
                    location.href = data.link;
                })
                .catch((err) => console.log(err));

            // setTimeout(() => {
            //     location.href = `${hostUrl}/tasks`;
            // }, 1000);
        });
    });