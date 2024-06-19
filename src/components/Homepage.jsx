import React, { useState } from 'react';
import GetDetails from './Getdetails';
import AddEmployee from './Addemplyee';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Main() {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showGetDetails, setShowGetDetails] = useState(false);

  const handleClickAddEmployee = () => {
    setShowAddEmployee(true);
    setShowGetDetails(false);
  };

  const handleClickGetDetails = () => {
    setShowAddEmployee(false);
    setShowGetDetails(true);
  };

  return (
    <div className="bg-slate-700 w-full h-screen flex flex-col items-center gap-10">
      <div className="heading text-5xl font-semibold text-center font-serif text-amber-700 pt-9">
        DGTLMART
      </div>  
      <div className="options flex flex-wrap gap-6 justify-center items-center ">
        <div
          className="addemployee btn  btn-primary text-center text-xl cursor-pointer"
          onClick={handleClickAddEmployee}
        >
          Add employee
        </div>
        <div
          className="search btn  btn-accent text-center text-xl text-pretty cursor-pointer"
          onClick={handleClickGetDetails}
        >
          Get employee details
        </div>
      </div>
    <div className='w-[70%] h-[30rem] flex justify-center'>
      {showAddEmployee && <AddEmployee />}
      {showGetDetails && <GetDetails />}
      </div>
    </div>
  );
}
