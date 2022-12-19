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
                <span>Begins: ${data[i].starts}; Ends: ${data[i].ends}</span>
                <p>${data[i].description}</p>
            `;
            container.appendChild(newItem);

            const deleteArr = document.querySelectorAll('.delete');

            for (let i = 0; i < deleteArr.length; i++) {
                const dlete = document.getElementById(`delete${i}`);
                dlete.onclick = (e) => {
                    const id = e.target.parentElement.nextSibling.nextSibling.innerHTML;
                    fetch(`${localhost}/deleteTask/${id}`, {method: 'DELETE'})
                    .then(() => {
                        setTimeout(() => {
                            location.href = localhost;
                        });
                    });
                }
            }
        }
    })
    .catch((err) => err);

