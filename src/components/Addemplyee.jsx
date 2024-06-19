import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddEmployee() {
    const [isSaved, setIsSaved] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        from: '',
        position: ''
    });

    const handleChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('https://dgtl-backend1.onrender.com/add/employee', newEmployee);
          console.log('Added new employee:', response.data);
          setNewEmployee({ name: '', from: '', position: '' });
          setIsSaved(true);
          toast.success("Employee details are added to database");
      } catch (error) {
          console.error('Error adding employee: ', error);
          // Enhanced error handling
          if (error.code === 'ERR_NETWORK') {
              toast.error("Network error. Please check your connection and try again.");
          } else {
              toast.error("An error occurred. Please try again later.");
          }
      }
    };
  
  
    return (
      <div className="flex flex-col justify-center items-center -mt-10 ">
        <h2 className="text-[1.7rem] text-center mb-5 font-bold uppercase text-violet-700 tracking-wide">
          Fill the employee details
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-5"
        >
          <label className="input w-56 input-bordered flex items-center gap-2">
            <input
              type="text"
              className="w-14 grow"
              placeholder="Enter name"
              name="name"
              value={newEmployee.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input w-56 input-bordered flex items-center gap-2">
            <input
              type="text"
              className=" grow"
              placeholder="Hometown"
              name="from"
              value={newEmployee.from}
              onChange={handleChange}
              required
            />
          </label>
          <label className="input w-56 input-bordered flex items-center gap-2">
            <input
              type="text"
              className=" grow"
              placeholder="Position"
              name="position"
              value={newEmployee.position}
              onChange={handleChange}
              required
            />
          </label>
          <button
            type="submit"
            className="btn btn-info btn-outline hover:btn-info"
            
          >
            Add Employee
          </button>
          {/* {isSaved && <div>Data saved successfully</div>} */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
          />
        </form>
      </div>
    );
}
