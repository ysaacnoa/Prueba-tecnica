/* eslint-disable react/prop-types */

import  { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar () {

    const [isOpen, setIsOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  return(
    <>
    
      <button
        className="fixed top-5 left-4 text-white z-50 focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <aside className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white z-40 transition-transform ease-in-out duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <nav className="flex flex-col items-center h-full">
        <ul className="py-4 w-full flex-1 flex flex-col justify-center items-center gap-8">
          <li className="px-4 py-2 cursor-pointer w-full my-2 mx-3 transition-colors hover:bg-gray-700 hover:text-gray-300 rounded-md text-center text-3xl">
            <Link className="hover:font-extrabold transition-all duration-300" to="/">
              <span className="inline-block p-2">
                Paises
              </span>
            </Link>
          </li>
          <li className="px-4 py-2 cursor-pointer w-full my-2 mx-3 transition-colors hover:bg-gray-700 hover:text-gray-300 rounded-md text-center text-2xl">
            <Link className="hover:font-extrabold" to="/page2">
              <span className="inline-block p-2">
                Option 2
              </span>
            </Link>
          </li>
          <li className="px-4 py-2 cursor-pointer w-full my-2 mx-3 transition-colors hover:bg-gray-700 hover:text-gray-300 rounded-md text-center text-2xl">
            <Link className="hover:font-extrabold" to="/page3">
              <span className="inline-block p-2">
                Option 3
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      </aside>
    </>
  )
}