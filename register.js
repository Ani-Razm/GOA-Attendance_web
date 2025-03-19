document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.push({name: name, surname: surname, email: email, password: password, students: {}});

    localStorage.setItem('users', JSON.stringify(users));
})