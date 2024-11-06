import React, { useState,useContext,useEffect } from 'react'
import '../../assets/style/ledger.css'

import img from '../../assets/media/logo.jpg'
import WithdrawHistoryModal from '../../component/WithdrawHistoryModal';
import {BACK_URL} from '../../../ENV'
import { GlobalContext } from '../../context/Global';


function Ledger() {
    const [myRefferals, setMyRefferals] = useState([])
    const [myWidthDraws, setMyWidthDraws] = useState([])
    const context = useContext(GlobalContext)
    const fetchReferrals=async()=>{
        console.log("fetching data")
        const res = await fetch(`${BACK_URL}/api/refs/${context.global.User._id}`)
        const data = await res.json()
        console.log({refferals:data.data})
        setMyRefferals(data.data)
    }
    const fetchWithDrawReq = async () => {
        const res = await fetch(`${BACK_URL}/api/widthdraw/${context.global.User._id}`)
        const data = await res.json()
        console.log({ withDraws_are: data.data })
        setMyWidthDraws(data.data)
    }

    const [modal, setModal] = useState(false); 

    const handleModal =()=>{
        if(!modal){
            setModal(true)
        }
        else{
            setModal(false)
        }
    }


    const withdrawalHistory = [
        {
            id: 1,
            profile: "John Doe",
            company: "JazzCash",
            icon: "📱", // Placeholder for icon
            amount: "$500",
        },
        {
            id: 2,
            profile: "Sarah Smith",
            company: "PayPal",
            icon: "💳", // Placeholder for icon
            amount: "$300",
        },
        {
            id: 3,
            profile: "Alex Johnson",
            company: "Skrill",
            icon: "💼", // Placeholder for icon
            amount: "$150",
        },
    ];

    useEffect(() => {
        fetchReferrals()
        fetchWithDrawReq()
    }, [])


    return (
        <>
            <div className="container-fluid p-md-5 ledger ">
                <div className="d-flex justify-content-center flex-column flex-lg-row alig gap-4">
                    <div className="col-lg-6 col-12 history-box">
                        <div className="refrel-box p-2 text-center">
                            <h2>Successful Referral</h2>
                        </div>
                        <table className="p-4">
                            <thead>
                                <tr className='table-head'>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myRefferals.map((user, i) => (
                                    <tr className="refrel-data relative left-4" key={i}>
                                    
                                        <td className='ml-4'>{user.fname}</td>
                                        <td className='ml-4'>{user.isApproved=='true'?"Approved":"Not Approved"}</td>
                                        <td className='ml-4'>{user?.email?user.email.slice(0,10):"no email"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    <div className="col-lg-6 col-12 history-box row px-4" id='cash-box'>
                        <div className="col-md-12 withdraw-box wb-history p-2">
                            <div className='mt-3 mb-md-5 d-flex justify-content-between'>
                            <h3 >Withdraw History</h3>
                            <button onClick={handleModal}>Withdraw Request</button>
                            </div>
                            {myWidthDraws.map((withdraw) => (
                                <div
                                    key={withdraw.id}
                                    className="withdraw-item d-flex justify-content-between align-items-center mb-3 px-3">
                                    {/* Left side: Profile and company */}
                                    <div className="left-side d-flex align-items-center">
                                        {/* <div className="icon" style={{ fontSize: "55px", marginRight: "10px" }}>
                                            {withdraw._id}
                                        </div> */}
                                        <div className="profile-details flex gap-16 py-3 justify-center items-center rounded-3xl text-left">
                                            <p className="m-0 text-lg ">{withdraw.widthDrawType}</p>
                                            <p className="m-0 ">{withdraw.status}</p>
                                        </div>
                                    </div>

                                    {/* Right side: Amount withdrawn */}
                                    <div className="right-side">
                                        <p className="m-0"><strong className='h5'>Rs.{withdraw.pointRequested/10}</strong></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {!modal ? '': <WithdrawHistoryModal closeModal={handleModal}/>}

            </div >
        </>
    )
}

export default Ledger