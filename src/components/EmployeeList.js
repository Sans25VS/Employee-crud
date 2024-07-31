// src/components/EmployeeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/employees/${id}`)
      .then(response => {
        setEmployees(employees.filter(emp => emp._id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Employees</h1>
      {employees.length === 0 ? <p>No Employees in the system</p> : (
        <ul>
          {employees.map(emp => (
            <li key={emp._id}>
              {emp.name} ({emp._id}) 
              <Link to={`/employee/${emp._id}`}>Details</Link>
              <Link to={`/edit-employee/${emp._id}`}>Edit</Link>
              <button onClick={() => deleteEmployee(emp._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeList;
