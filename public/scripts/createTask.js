const send = document.getElementById('send');


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
        urgency: urgency
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
        
        in this example we store all configurations in an object called fetchParams which, at the time of writing this commentary, is above)
    */
    fetch("http://localhost:8080/tasks/createTask", fetchParams)

        .then((data) => {

            return data.json();

        })

        .then((res) => {

            console.log(res)
            window.location.replace("http://localhost:8080/tasks/createTask");

        })

        .catch((err) => console.log(err));
})