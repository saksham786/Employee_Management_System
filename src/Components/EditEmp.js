import React,{useState} from 'react'
import Swal from 'sweetalert2';
function EditEmp({employees,selectedEmployee,setEmployees,setIsEditing}) {

  const id= selectedEmployee.id;
  const [name,setName]= useState(selectedEmployee.name);
  const [email,setEmail]= useState(selectedEmployee.email);
  const [address,setAddress]= useState(selectedEmployee.address);
  const [phone_number,setPhone]= useState(selectedEmployee.phone_number);

  const handleUpdate=(e)=>{
    e.preventDefault();
    if(!name || !email || !address || !phone_number){
      return Swal.fire({
        icon: 'error',
        title:'Error!',
        text: 'Details are missing',
        showConfirmButton: true
      });
    }

    const employee= {
      id,
      name,
      email,
      address,
      phone_number:phone_number
    };

    for(let i=0;i<employees.length;i++){
      if(employees[i].id===id){
        employees.splice(i,1,employee);
        break;
      }
    }

    setEmployees(employees);
    setIsEditing(false);

    Swal.fire({
      icon: 'success',
      title: 'Upadted!',
      text: `${employee.name}'s data is added`,
      showConfirmButton: false,
      timer: 1500
    });

  };


  return (
    <div className='small-container'>
      <form onSubmit={handleUpdate}>
        <h1>Edit Employee</h1>
        <label htmlFor="name">Name</label>
        <input type="text" id='name' name='name' value={name} onChange={e=> setName(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input type="email" id='email' name='email' value={email} onChange={e=> setEmail(e.target.value)} />
        <label htmlFor="adddress">Address</label>
        <textarea id='adddress' name='adddress' value={address} onChange={e=> setAddress(e.target.value)}></textarea>
        <label htmlFor="phone_number">Phone</label>
        <input type="text" id='phone_number' name='phone_number' value={phone_number} onChange={e=> setPhone(e.target.value)} />
        <div style={{marginTop: '30px'}}>
          <input type="submit" value='Edit' />
          <button style={{marginLeft: '12px'}} className='muted-button' onClick={()=>setIsEditing(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditEmp