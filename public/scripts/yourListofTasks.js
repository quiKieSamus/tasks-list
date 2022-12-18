const container = document.querySelector('.container');

const localhost = "http://localhost:8080/tasks";



fetch(localhost, { method: 'POST' })
    .then((res) => res.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            const newItem = document.createElement('div');
            newItem.className = "task";
            newItem.innerHTML = `
                <p>${data[i].id}</p>
                <h3>${data[i].title}</h3>
                <span>Begins: ${data[i].starts}; Ends: ${data[i].ends}</span>
                <p>${data[i].description}</p>
            `;
            container.appendChild(newItem);
        }
    })
    .catch((err) => err);