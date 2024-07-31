// src/components/EmployeeDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/employees/${id}`)
      .then(response => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      {employee ? (
        <div>
          <h1>{employee.name}</h1>
          <p>ID: {employee._id}</p>
          <p>Address: {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zipCode}</p>
          <h3>Contact Methods</h3>
          <ul>
            {employee.contactMethods.map((method, index) => (
              <li key={index}>{method.contactMethod}: {method.value}</li>
            ))}
          </ul>
        </div>
      ) : <p>Loading...</p>}
    </div>
  );
};

export default EmployeeDetail;
