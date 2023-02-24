import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ Students, selectedStudent, setStudents, setIsEditing }) => {
  const id = selectedStudent.id;

  const [firstName, setFirstName] = useState(selectedStudent.firstName);
  const [lastName, setLastName] = useState(selectedStudent.lastName);
  const [email, setEmail] = useState(selectedStudent.email);
  const [startTime, setStartTime] = useState(selectedStudent.startTime);
  const [endTime, setEndTime] = useState(selectedStudent.endTime);
  const [date, setDate] = useState(selectedStudent.date);

  const handleUpdate = e => {
    e.preventDefault();

    if (!firstName || !lastName || !email) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const Student = {
      id,
      firstName,
      lastName,
      email,
      startTime
      ,endTime,
      date
    };

    for (let i = 0; i < Students.length; i++) {
      if (Students[i].id === id) {
        Students.splice(i, 1, Student);
        break;
      }
    }

    localStorage.setItem('Students/data', JSON.stringify(Students));
    setStudents(Students);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${Student.firstName} ${Student.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Student</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="startTime"> Start Time</label>
        <input
          id="startTime"
          type="time"
          name="startTime"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        />
        <label htmlFor="endTime"> Start Time</label>
         <input
          id="endTime"
          type="time"
          name="endTime"
          value={startTime}
          onChange={e => setEndTime(e.target.value)}
        />

        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
