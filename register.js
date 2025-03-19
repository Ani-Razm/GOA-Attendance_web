document.querySelector('.passwordAlert').textContent = '';
document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const surname = document.querySelector('#surname').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (name && surname && email && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        for(let user of users){
            if (email == user.email) {
                document.querySelector('.passwordAlert').textContent = 'this user already exists';
                document.querySelector('.passwordAlert').style.color = 'red';
                return;
            }
        }

        users.push({ name: name, surname: surname, email: email, password: password, students: {} });

        localStorage.setItem('users', JSON.stringify(users));
        alert('you are registered');
    } else {
        alert('please fill all fields')
    }
})