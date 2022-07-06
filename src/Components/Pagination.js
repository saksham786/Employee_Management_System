import React from 'react';

function Pagination({nPages,currentPage, setCurrentPage}) {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const nextPage = () => {
    if(currentPage !== nPages) 
        setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) 
            setCurrentPage(currentPage - 1)
    }
  return (
    <nav>
        <ul className='pagination justify-content-end'>
            <li className='page-item'>
                <a href="#"  onClick={prevPage} className='page-link'>Previous</a>
            </li>
            {pageNumbers.map(pgNumber=>(
                <li key={pgNumber} className={`page-item ${currentPage== pgNumber ? 'active': ''}`}>
                     <a href="#" className='page-link' onClick={()=>setCurrentPage(pgNumber)}>
                        {pgNumber}
                     </a>
                </li>
            ))}
            <li className='page-item'>
                <a href="#" className='page-link' onClick={nextPage}>Next</a>
            </li>
        </ul>
    </nav>
  )
}

export default Pagination