import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { StudentsData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [Students, setStudents] = useState(StudentsData);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('Students_data'));
    if (data !== null && Object.keys(data).length !== 0) setStudents(data);
  }, []);

  const handleEdit = id => {
    const [Student] = Students.filter(Student => Student.id === id);

    setSelectedStudent(Student);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [Student] = Students.filter(Student => Student.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${Student.firstName} ${Student.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const StudentsCopy = Students.filter(Student => Student.id !== id);
        localStorage.setItem('Students_data', JSON.stringify(StudentsCopy));
        setStudents(StudentsCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            Students={Students}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          Students={Students}
          setStudents={setStudents}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          Students={Students}
          selectedStudent={selectedStudent}
          setStudents={setStudents}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
