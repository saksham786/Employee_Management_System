import React, { useState,useRef, useEffect } from 'react';

import Swal from 'sweetalert2';

function AddEmp({employees, setEmployees, setIsAdding}) {

  const [name,setName]= useState('');
  const [email,setEmail]= useState('');
  const [address,setAddress]= useState('');
  const [phone_number,setPhone]= useState('');

  const textInput = useRef(null);

  useEffect(()=>{
    textInput.current.focus();
  },[])

  const handleAdd= (e) =>{
    e.preventDefault();
    if(!name || !email || !address || !phone_number){
      return Swal.fire({
        icon: 'error',
        title:'Error!',
        text: 'Details are missing',
        showConfirmButton: true
      });
    }

    const id= Number(new Date());

    const newEmployee= {
      id,
      name,
      email,
      address,
      phone_number
    }

    employees.push(newEmployee);
    setEmployees(employees);
    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Employee Added',
      text: `${name}'s data is added`,
      showConfirmButton: false,
      timer: 1500
    });

  }

  return (
    <div className='small-container'>
      <form onSubmit={handleAdd}>
        <h1>Add Employee</h1>
        <label htmlFor="name">Name</label>
        <input type="text" id='name' ref={textInput} name='name' value={name} onChange={e=> setName(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input type="email" id='email' name='email' value={email} onChange={e=> setEmail(e.target.value)} />
        <label htmlFor="adddress">Address</label>
        <textarea id='adddress' name='adddress' value={address} onChange={e=> setAddress(e.target.value)}></textarea>
        <label htmlFor="phone">Phone</label>
        <input type="text" id='phone' name='phone' value={phone_number} onChange={e=> setPhone(e.target.value)} />
        <div style={{marginTop: '30px'}}>
          <input type="submit" value='Add' />
          <button style={{marginLeft: '12px'}} className='muted-button' onClick={()=>setIsAdding(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddEmp