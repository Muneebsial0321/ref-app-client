import React, { useState } from 'react'
import { Link } from 'react-router-dom';
// import { IoHome } from "react-icons/io5";
// import { FaBook } from 'react-icons/fa';
// import { FaWallet } from 'react-icons/fa';
// import { GoPersonFill } from "react-icons/go";
// import { FaTasks } from "react-icons/fa";
function Navbar() {
    const [state, setstate] = useState(true)
    return (
        <>
            <nav className="flex items-center gap-6 px-5 max-md:items-start">
                <div >
                    <img src={'logo.jpg'} alt="" />
                </div>
                <div className={`flex md:flex-row  flex-col max-md:mx-auto gap-6 ${state ? "max-md:hidden" : ""}`}>
                        <Link to='/home'>
                        {/* <IoHome size={32} /> */}
                            <p className='navbar-icon-text-'>Home</p>
                        </Link>
            
                        <Link to='/ledger'>
                        {/* <FaBook size={29} /> */}
                        <p className='navbar-icon-text-'>Ledger</p>
                    </Link>
                 
                        <Link to='/wallet'>
                        {/* <FaWallet size={31} /> */}
                        <p className='navbar-icon-text-'>Wallet</p>
                    </Link>
                   
                        <Link to='/task'>
                        {/* <FaTasks size={34} /> */}
                        <p className='navbar-icon-text-'>Task</p>
                    </Link>
                        <Link to='/profile'>
                        {/* <FaTasks size={34} /> */}
                        <p className='navbar-icon-text-'>Profile</p>
                    </Link>

                </div>

                <button className={`${state ? "bg-white" : "bg-black"} md:hidden`} onClick={() => setstate((e) => !e)}>M</button>
            </nav>
        </>
    )
}

export default Navbar
