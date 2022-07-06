import React, { useState } from 'react';
import Swal from 'sweetalert2';

function List({employees, handleEdit, handleDelete,setIsAdding,isCheckbox,setIsCheckbox,setEmployees,realEmps,setRealEmps}) {

  const  [isChecked,setIsChecked]=useState([]);

  const handleCheckbox=(e)=>{
    const {value, checked}= e.target;
    if(checked){
      setIsChecked([...isChecked,value]);
    }
    else{
      setIsChecked(isChecked.filter((e)=>e!==value));
    }
    
  }

  const onDelete=()=>{
    if(isCheckbox){
    Swal.fire({
              icon:'warning',
              title:'Are you sure you want to delete all the records?',
              showCancelButton:true,
              text: 'This action cannot be undone',
              confirmButtonText:'Delete',
              cancelButtonText: 'Cancel',
          }).then(result=>{
              if(result.value){
                  Swal.fire({
                      icon:'success',
                      title: 'Deleted',
                      text: 'All records are deleted.',
                      showConfirmButton : false,
                      timer:1500
                  });
                  setEmployees([]);
              }
          });
      }else if(isChecked.length>0){
        Swal.fire({
              icon:'warning',
              title:'Are you sure you want to delete the selected records?',
              showCancelButton:true,
              text: 'This action cannot be undone',
              confirmButtonText:'Delete',
              cancelButtonText: 'Cancel',
          }).then(result=>{
              if(result.value){
                  Swal.fire({
                      icon:'success',
                      title: 'Deleted',
                      text: 'Selected records are deleted.',
                      showConfirmButton : false,
                      timer:1500
                  });
                  let isCheckedNew= isChecked.map(i=>Number(i));

                  setEmployees(realEmps.filter(employee=>!isCheckedNew.includes(employee.id)))
                  console.log(realEmps)
              }
          });
      }else if(isCheckbox===false && isChecked.length===0 ){
        Swal.fire({
          icon: 'error',
          title: 'Please select the records to delete'
        });
      }

  }

  const handleOnChnage =()=>{
    setIsCheckbox(!isCheckbox);
  }
  return (
    <div><header>
      <h1>Employee Management System</h1>
      <div style={{marginTop:'30px', marginBottom:'18px'}}>
        <button className='round-button' onClick={()=>setIsAdding(true)}>Add Employee</button>
        <button className='round-button' style={{marginLeft: '10px', background: 'red', border:'none'}}
        onClick={onDelete}>Delete</button>
      </div>
    </header>
    <div className='contain-table'>
      <table className='striped-table'>
  <thead>
    <tr>
      <th><input type="checkbox" id='check' name='check' checked={isCheckbox} onChange={handleOnChnage}/></th>
      <th>Name</th>
      <th>Email</th>
      <th>Address</th>
      <th>Phone</th>
      <th colSpan={2} className='text-center'>Actions</th>
    </tr>
  </thead>
  <tbody>
    {employees.length > 0 ? (
      employees.sort(function(a,b){
      return b.id-a.id; 
    }).map((employee,i)=>{
        return <tr key={employee.id}>
          {/* <td><input type="checkbox" /></td> */}
          <td><input type="checkbox" value={employee.id} checked={employee.isChecked} onChange={(e)=>handleCheckbox(e)}/></td>
          <td>{employee.name}</td>
          <td>{employee.email}</td>
          <td>{employee.address}</td>
          <td>{employee.phone_number}</td>
          <td className='text-right'>
            <button onClick={()=>handleEdit(employee.id)} className='button muted-button'>
              Edit
            </button>
          </td>
          <td className='text-left'>
            <button onClick={()=>handleDelete(employee.id)} className='button muted-button'>
              Delete
            </button>
          </td>
        </tr>
      })
    ):(
      <tr>
        <td colSpan={7}>No Employees</td>
      </tr>
    )}
  </tbody>
</table>
    </div>
    </div>
  )
}

export default List