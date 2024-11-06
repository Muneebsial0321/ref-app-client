// import React, { useState, useContext, useEffect } from 'react'
import { BACK_URL } from '../../../ENV'
// import { GlobalContext } from '../../context/Global';


// const ForgetPass = () => {
//     const context = useContext(GlobalContext)
//     const [state, setstate] = useState({})
//     const [myPoints, setMyPoints] = useState(0)


//     const __onchange__ = (e) => {
//         console.log({[e.target.name]: e.target.value })
//         setstate((prev) => (
//             { ...prev, [e.target.name]: e.target.value }
//         ))

//     }


//     const setPoints = () => {
//         console.log("setting points", +state.pointRequested)
//         if (myPoints >= +state.pointRequested) {
//             setMyPoints(myPoints - +state.pointRequested)
//             alert("Success! New points are: " + (myPoints - +state.pointRequested))
//         } else {
//             alert("Please enter valid data")
//             closeModal()
//         }
//     }

//     const getPoints = async () => {
//         console.log("fetching points")
//         const res = await fetch(`${BACK_URL}/api/points/${context.global.User._id}`)
//         const data = await res.json()
//         setMyPoints(data)

//     }

//     const SetWithDrawReq = async () => {
//         console.log("fetching data",state)
//         // const res = await fetch(`${BACK_URL}/api/refs/${context.global.User._id}`,{
//         const res = await fetch(`${BACK_URL}/api/widthdraw`,{
//             method:"POST",
//             headers: {
//                 'Content-Type': 'application/json' // Set the content type to JSON
//             },
//             body:JSON.stringify({userId:context.global.User._id,...state})
//         })
//         const data = await res.json()
//         console.log({ data: data.data })
//     }

//     useEffect(() => {
//         getPoints()
//     }, [])
//     return (
//         <>
//             {/* <div onClick={closeModal} className=" bg-gray-900 text-gray-100 hover:text-black hover:bg-white transition-all absolute z-20 top-10 right-10 w-[3rem] h-[3rem] rounded-full flex justify-center items-center font-extrabold text-2xl cursor-pointer">X</div> */}
//             <div className='bg-[#0000009e] w-full h-[110vh] flex justify-center  backdrop-blur-lg top-0 text-white absolute'>
//                 <div className="flex flex-col justify-center items-center  h-[100vh] gap-6 sm:w-[25rem] w-[19rem]">
//                     <h1 className='text-3xl font-semibold text-center'>Change Password</h1>
//                     <input
//                         onChange={__onchange__}
//                         name='otp'
//                         placeholder='Your OTP'
//                         className='py-4 w-full bg-black px-9 rounded-md border border-solid' type="text" />
//                     <input
//                         name='widthDrawType'
//                         onChange={__onchange__}

//                         placeholder='New Password'
//                         className='py-4 w-full bg-black px-9 rounded-md border border-solid' type="text" />

//                     <button onClick={SetWithDrawReq} className='py-3 w-full transition-all hover:bg-[#5f5e5e] px-9 rounded-full border border-solid'>
//                         Change Password
//                     </button>
//                 </div>

//             </div>
//         </>
//     )
// }

// export default ForgetPass

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      console.log({email})
      const response = await axios.get(`${BACK_URL}/api/reset/${email}`);
      console.log({res_foget:response.data})
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="w-[25rem] mx-auto flex justify-center items-center flex-col h-[100vh] gap-6">
      <h2 className="text-4xl text-white">Forgot Password</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='py-4 w-full bg-black px-9 rounded-md border border-solid'  
        placeholder="Enter your email"
      />
      <Link to='/reset'><button onClick={handleForgotPassword}>Send OTP</button></Link>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword