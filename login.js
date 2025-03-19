document.querySelector('button').addEventListener('click', (e) => {
    // email and password check

    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.forEach((user) => {
        if (email == user.email && password == user.password) {
            // localStorage.setItem('currentUser', JSON.stringify(user));
            // localStorage.setItem('attendanceData', JSON.stringify(user.students));
            window.location.assign("/index.html");
            return;
        }
    })

    const alertP = document.querySelector('p');
    alertP.textContent = 'this user does not exist';
    alertP.style.color = 'red';
})