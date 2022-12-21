const container = document.querySelector('.container');

const localhost = "http://localhost:8080/tasks";



fetch(localhost, { method: 'POST' })
    .then((res) => res.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            const newItem = document.createElement('div');
            newItem.className = "task";
            newItem.innerHTML = `
                <span><button class="edit" id="edit${i}">EDIT TASK</button><button class="delete" id="delete${i}">x</button></span>
                <p>${data[i].id}</p>
                <h3>${data[i].title}</h3>
                <span>Begins:<span>${data[i].starts.replace('T04:00:00.000Z', "")}</span>; Ends: <span>${data[i].ends.replace('T04:00:00.000Z', "")}</span></span>
                <p>${data[i].description}</p>
            `;
            container.appendChild(newItem);

            const deleteArr = document.querySelectorAll('.delete');

            for (let i = 0; i < deleteArr.length; i++) {
                const dlete = document.getElementById(`delete${i}`);

                //delete task
                dlete.onclick = (e) => {
                    const id = e.target.parentElement.nextSibling.nextSibling.innerHTML;
                    fetch(`${localhost}/deleteTask/${id}`, { method: 'DELETE' });
                    setTimeout(() => {
                        location.href = localhost;
                    }, 100);

                }
            }

            const editArr = document.querySelectorAll('.edit');

            for (let i = 0; i < editArr.length; i++) {
                const edit = document.getElementById(`edit${i}`);

                //edit task
                edit.onclick = (e) => {
                    e.target.style.display = "none";
                    const parent = e.target.parentElement.parentElement;

                    //id
                    const id = e.target.parentElement.nextSibling.nextSibling.innerHTML;

                    //title
                    const title = e.target.parentElement.nextSibling.nextSibling.nextSibling.nextSibling;

                    //starts
                    const starts = e.target.parentElement.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes[1];

                    // console.log(starts);

                    //ends 
                    const ends = e.target.parentElement.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.childNodes[3];

                    //description
                    const desc = e.target.parentElement.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;


                    //begin terraforming
                    title.innerHTML = `<input type="text" value="${title.innerHTML}">`;
                    starts.innerHTML = `<input type="date" value="${starts.innerHTML}">`;
                    ends.innerHTML = `<input type="date" value="${ends.innerHTML}" class="endsEdit">`;
                    desc.innerHTML = `<textarea rows="10" cols="30">${desc.innerHTML}</textarea>`;
                    console.log(title.lastChild.value)

                    const submitButton = document.createElement('button');
                    submitButton.innerHTML = "Actualizar";
                    parent.appendChild(submitButton);

                    submitButton.addEventListener('click', () => {

                        const data = {
                            id: id,
                            title: title.lastChild.value,
                            starts: starts.childNodes[0].value,
                            ends: ends.childNodes[0].value,
                            desc: desc.firstChild.value
                        };
                        console.log(JSON.stringify(data));
                        fetch(`${localhost}/updateTask`, {
                            method: "PATCH",
                            headers: {
                                "content-type": "application/json; charset=UTF-8"
                            },
                            body: JSON.stringify(data)
                        })
                        setTimeout(() => location.reload(), 100);
                    });
                }
            }
        }
    })
    .catch((err) => err);


