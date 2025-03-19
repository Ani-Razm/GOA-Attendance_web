const addStudentBtn = document.querySelector('#addStudent');

addStudentBtn.addEventListener('click', () => {
  addStudentToLocalStorage();
  renderTable(loadAttedanceForDate(document.querySelector('#attendanceDate').value));
})

// Function to add student in the local storage 
function addStudentToLocalStorage() {
  const date = document.querySelector('#attendanceDate').value;
  const name = document.querySelector('#studentName').value;

  if (!date) {
    alert('Please enter a date');
    return;
  }

  if (!name) {
    alert('Please enter a student name');
    return;
  }

  const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || {};

  if (!attendanceData[date]) {
    attendanceData[date] = [];
  }

  attendanceData[date].push({ name: name, status: 'absent'})

  document.querySelector('#studentName').value = '';

  localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
}

// function to load attendance from specific date
function loadAttedanceForDate(date) {
  
  const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || {};

  if (!attendanceData[date]) {
    attendanceData[date] = [];
  }

  renderTable(attendanceData[date]);
  return attendanceData[date];
}

function toggleAttendance(date, index) {
  const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || {};

  const status = attendanceData[date][index].status === 'present' ? 'absent' : 'present';
  attendanceData[date][index].status = status;


  localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
  renderTable(attendanceData[date]);
}

// function to render table on website
function renderTable(data) {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  data.forEach((student, index) => {
    const row = document.createElement('tr');

    // creating name column
    const nameCell = document.createElement('td');
    const nameSpan = document.createElement('span');

    nameSpan.innerHTML = student.name;

    // creating edit button in name cell
    const editBtn = document.createElement('i');
    editBtn.classList = 'bx bxs-edit-alt';

    editBtn.addEventListener('click', () => {
      const input = document.createElement('input');
      input.value = nameSpan.textContent;
      nameCell.replaceChild(input, nameSpan);

      input.addEventListener('blur', () => {
      nameSpan.textContent = input.value;
      nameCell.replaceChild(nameSpan, input);

      // update name in local storage
      const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || {};
      const date = document.getElementById('attendanceDate').value;
      attendanceData[date][index].name = input.value;
      localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
      });
    });

    // creating attendance column
    const statusCell = document.createElement('td');
    const statusBtn = document.createElement('button');
    statusBtn.textContent = student.status;
    statusBtn.classList = student.status;

    statusBtn.addEventListener('click', () => toggleAttendance(document.getElementById('attendanceDate').value, index));

    // creating delete column
    const deleteCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.classList = 'delete';
    const icon = document.createElement('i');
    icon.classList = 'bx bx-trash';

    deleteBtn.addEventListener('click', () => {
      const attendanceData = JSON.parse(localStorage.getItem('attendanceData'));
      attendanceData[document.getElementById('attendanceDate').value].splice(index, 1);
      localStorage.setItem('attendanceData', JSON.stringify(attendanceData));

      renderTable(loadAttedanceForDate(document.getElementById('attendanceDate').value));
    }
 ) 

    // adding elements on website
    deleteBtn.appendChild(icon);
    deleteCell.appendChild(deleteBtn);

    nameCell.appendChild(nameSpan);
    nameCell.appendChild(editBtn);

    statusCell.appendChild(statusBtn);

    row.appendChild(nameCell);
    row.appendChild(statusCell);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
    UpdatePieChart();
  });
}

function UpdatePieChart() {
  const date = document.getElementById('attendanceDate').value;
  const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || {};
  // change pie chart

  if (!attendanceData[date] || attendanceData[date].length == 0) {
    document.querySelector('#totalAttendance').textContent = '0%';
    document.querySelector('#totalStudents').textContent = 0;
    document.querySelector('.chart').style.background = `radial-gradient(var(--color-mountain-meadow-300) 0% 40%,
      transparent 40% 100%),
    conic-gradient(var(--red_color) 0% 100%,
      var(--color-mountain-meadow-700) 100% 100%)`;
    return;
  }
  
  let studentsAbsent = 0;
  let studentsPresent = 0;

  attendanceData[date].forEach((student) => {
    if (student.status === 'present') {
      studentsPresent++;
    } else {
      studentsAbsent++;
    }
  })

  let studentstotal = studentsAbsent + studentsPresent;

  let AbsentPercentage = Math.ceil((studentsAbsent / studentstotal) * 100);
  let PresentPercentage = Math.trunc((studentsPresent / studentstotal) * 100);

  document.querySelector('.chart').style.background = `radial-gradient(var(--color-mountain-meadow-300) 0% 40%,
      transparent 40% 100%),
    conic-gradient(var(--red_color) 0% ${AbsentPercentage}%,
      var(--color-mountain-meadow-700) ${AbsentPercentage}% 100%)`;

  document.querySelector('#totalAttendance').textContent = `${PresentPercentage}%`;

  document.querySelector('#totalStudents').textContent = studentstotal;

}

document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('attendanceDate');
  const today = new Date().toISOString().split('T')[0]; 
  dateInput.value = today;

  const currentDate = document.querySelector('#currentDate');
  currentDate.textContent = dateInput.value;
 
  renderTable(loadAttedanceForDate(today));
  UpdatePieChart();

  dateInput.addEventListener('change', (e) => {
    currentDate.textContent = dateInput.value;
    renderTable(loadAttedanceForDate(e.target.value));
    UpdatePieChart()
  });
});
