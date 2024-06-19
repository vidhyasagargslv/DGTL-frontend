import React, { useState, useEffect,useRef } from 'react'
import axios from "axios";

export default function Getdetails() {
  const [query, setQuery] = useState("");
  const [employees, setEmployees] = useState([]);
  const searchInputRef = useRef(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://dgtl-backend1.onrender.com/employee?query=${query}`
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  
  //btn which will clear the output of the search value
  const handleclearsearch = () => {
    setEmployees([]);
    setQuery("");
  };
  

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault(); // Prevent the default action to avoid any conflict with browser shortcuts
        searchInputRef.current.focus(); // Focus the search input field
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start gap-7 mt-6">
      <h2 className="text-[2rem] text-violet-600 text-center font-bold uppercase tracking-wider max-sm:text-[1.7rem]">
        Search Employees
      </h2>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow w-52"
          placeholder="Search by Name or position"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={searchInputRef}
        />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>
      <div className="cta flex  flex-row-reverse gap-5">
      <button
        onClick={handleSearch}
        className="btn btn-primary btn-outline w-36"
      >
        Search
      </button>

      <button className='btn btn-error btn-outline w-28 hover:btn-error'
      onClick={handleclearsearch}>
        clear search
      </button>
      </div>

      {employees.length === 0 ? (
        <p>No data found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra table-lg max-sm:table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Hometown</th>
                <th>position</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.from}</td>
                  <td>{employee.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


