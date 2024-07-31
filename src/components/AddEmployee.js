// src/components/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    address: { line1: '', city: '', country: '', zipCode: '' },
    contactMethods: [{ contactMethod: '', value: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, address: { ...employee.address, [name]: value } });
  };

  const handleContactChange = (index, e) => {
    const { name, value } = e.target;
    const contacts = [...employee.contactMethods];
    contacts[index][name] = value;
    setEmployee({ ...employee, contactMethods: contacts });
  };

  const addContactMethod = () => {
    setEmployee({ ...employee, contactMethods: [...employee.contactMethods, { contactMethod: '', value: '' }] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/employees', employee)
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="line1" value={employee.address.line1} onChange={handleAddressChange} placeholder="Address Line 1" required />
        <input type="text" name="city" value={employee.address.city} onChange={handleAddressChange} placeholder="City" required />
        <input type="text" name="country" value={employee.address.country} onChange={handleAddressChange} placeholder="Country" required />
        <input type="text" name="zipCode" value={employee.address.zipCode} onChange={handleAddressChange} placeholder="Zip Code" required />
        {employee.contactMethods.map((contact, index) => (
          <div key={index}>
            <select name="contactMethod" value={contact.contactMethod} onChange={(e) => handleContactChange(index, e)} required>
              <option value="">Select Contact Method</option>
              <option value="EMAIL">Email</option>
              <option value="PHONE">Phone</option>
            </select>
            <input type="text" name="value" value={contact.value} onChange={(e) => handleContactChange(index, e)} placeholder="Contact Value" required />
          </div>
        ))}
        <button type="button" onClick={addContactMethod}>Add Contact Method</button>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
