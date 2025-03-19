document.querySelector('button').addEventListener('click', (e) => {
    // email and password check

    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    for(let user of users){
        if (email == user.email && password == user.password) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('attendanceData', JSON.stringify(user.students));
            window.location.assign("/main.html");
            return;
        }
    }

    const alertP = document.querySelector('p');
    alertP.textContent = 'this user does not exist or incorrect password';
    alertP.style.color = 'red';
})