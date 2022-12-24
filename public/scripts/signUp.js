const send = document.getElementById('send');
const hostUrl = "http://localhost:8080";

////this can change, check your computer's ip
const networkUrl = "http://192.168.0.189:8080";

//filling up select tag
document.addEventListener('DOMContentLoaded', () => {
    fetch(`${hostUrl}/occupations`, { method: 'POST' })
        .then((response) => response.json())
        .then((data) => {
            const select = document.querySelector('#ocp');
            for (let i = 0; i < data.length; i++) {
                const option = document.createElement('option');
                option.value = data[i].name;
                option.innerHTML = data[i].name;
                select.appendChild(option);
            }
        })
        .catch((err) => err);
});

send.addEventListener('click', () => {

    const user = document.querySelector('#user').value;
    const password = document.querySelector('#pwd').value;
    const name = document.querySelector('#name').value;
    const lName = document.querySelector('#lName').value;
    const bDay = document.querySelector('#bday').value;
    const ocp = document.querySelector('#ocp').value;

    const data = {
        user: user,
        password: password,
        name: name,
        lName: lName,
        bDay: bDay,
        ocp: ocp

    };

    const fetchParams = {
        headers: {
            "content-type": "application/json; charset=UTF-8" //important
        },
        body: JSON.stringify(data),
        method: "POST"
    };


    /*
        fetch can be used to make http requests
        in this case we do a get request to the server
        sending data on the notes to add

        in this case we are sending a json
        it is important that the content-type header is set to 
        "application/json; charset=UTF-8"
        Since its a JSON the body of the request needs to have 
        a JSON NOT A JS OBJECT (which is one of the reasons 
        it took me so long to fix
        And of course, for it to be a post request you gotta 
        first set the method to post
        
        in this example we store all configurations in an object called fetchParams which, at the time of writing this commentary, is above)
    */
    fetch(`${hostUrl}/signUp`, fetchParams)

        .then((data) => {

            return data.json();

        })

        .then((res) => {
            const result = res;
                
            if (result.state === 'false') {
                const warning = document.querySelector(".sign-err");
                warning.style.display = "block";
                warning.innerHTML = `User not added. Reason: ${result.reason}`;
                warning.style.color = "color";
            } else {
                location.href = result.link;
                return true;
            }

        });
})