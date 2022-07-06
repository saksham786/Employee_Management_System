import React, { useState } from 'react';
import employeesData from '../data/data';
// import Header from './Header';
import List from './List';
import AddEmp from './AddEmp';
import EditEmp from './EditEmp';
import Pagination from './Pagination';

import Swal from 'sweetalert2';


function Dashboard() {

    const [employees, setEmployees]= useState(employeesData);
    const [realEmps,setRealEmps]=useState(employeesData);
    const [selectedEmployee, setSelectedEmployee]= useState(null);
    const [isAdding, setIsAdding]= useState(false);
    const [isEditing, setIsEditing]= useState(false);
    const [isCheckbox,setIsCheckbox] = useState(false);

     // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);
    // No of Records to be displayed on each page   
    const [recordsPerPage] = useState(10);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = employees.slice(indexOfFirstRecord, 
                                    indexOfLastRecord);

    const nPages = Math.ceil(employees.length / recordsPerPage);

    const handleEdit=(id)=>{
        const [employee]=employees.filter(employee=> employee.id=== id);
        setSelectedEmployee(employee);
        setIsEditing(true);
    }

    const handleDelete=(id)=>{
        Swal.fire({
            icon:'warning',
            title:'Are you sure you want to delete this record?',
            showCancelButton:true,
            text: 'This action cannot be undone',
            confirmButtonText:'Delete',
            cancelButtonText: 'Cancel',
        }).then(result=>{
            if(result.value){
                const [employee]=employees.filter(employee=> employee.id=== id);
                Swal.fire({
                    icon:'success',
                    title: 'Deleted',
                    text: `${employee.name}'s data has been deleted.`,
                    showConfirmButton : false,
                    timer:1500
                });
                setEmployees(employees.filter(employee=>employee.id !==id));
            }
        });
    }

  return (
    <div className='container'>
        {!isAdding && !isEditing && (
            <>
            {/* <Header employees={employees} /> */}
            <List employees={currentRecords } handleEdit={handleEdit} handleDelete={handleDelete} 
            setIsAdding={setIsAdding} setEmployees={setEmployees}
            isCheckbox={isCheckbox} setIsCheckbox={setIsCheckbox} 
            realEmps={realEmps} setRealEmps={setRealEmps}/>
            <div style={{ float:'left'}}>Showing {currentRecords.length} of {employees.length} records</div>
            <Pagination
                nPages = { nPages }
                currentPage = { currentPage } 
                setCurrentPage = { setCurrentPage }
            />
            </>
        )}
        {isAdding && (
            <AddEmp employees={employees} setEmployees={setEmployees} setIsAdding={setIsAdding}/>
        )}
         {isEditing && (
            <EditEmp employees={employees} selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} 
            setEmployees={setEmployees} setIsEditing={setIsEditing}/>
        )}
    </div>
  )
}

export default Dashboard