import React from 'react'

function Header({employees,setIsAdding}) {

  const onDelete=()=>{

  }

  return (
    <header>
      <h1>Employee Management System</h1>
      <div style={{marginTop:'30px', marginBottom:'18px'}}>
        <button className='round-button' onClick={()=>setIsAdding(true)}>Add Employee</button>
        <button className='round-button' style={{marginLeft: '10px', background: 'red', border:'none'}}
        onClick={onDelete}>Delete</button>
      </div>
    </header>
  )
}

export default Header