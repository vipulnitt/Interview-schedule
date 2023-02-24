import React from 'react';

const Table = ({ Students, handleEdit, handleDelete }) => {
  Students.forEach((Student, i) => {
    Student.id = i + 1;
  });

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>StartTime</th>
            <th>EndTime</th>
            <th>Date</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Students.length > 0 ? (
            Students.map((Student, i) => (
              <tr key={Student.id}>
                <td>{i + 1}</td>
                <td>{Student.firstName}</td>
                <td>{Student.lastName}</td>
                <td>{Student.email}</td>
                <td>{Student.startTime}</td>
                <td>{Student.endTime}</td>
                <td>{Student.date} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(Student.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(Student.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Students</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
