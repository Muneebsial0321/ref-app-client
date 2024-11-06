// Home.jsx
import React, { useState,useContext,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/style/home.css';
import { GlobalContext } from '../../context/Global';
import {BACK_URL} from '../../../ENV'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate()
  const [refferalPoints, setMyRefferals] = useState(0)
  const [points, setPoints] = useState(0);


  const globalData = useContext(GlobalContext)
  const userPoint = globalData?.global?.points?.point || 0;
  const fname = globalData?.global?.User?.fname || "fname";
  const lname = globalData?.global?.User?.lname || "lname";


  const fetchReferrals=async()=>{
    console.log("fetching data")
    const res = await fetch(`${BACK_URL}/api/refs/${globalData.global.User._id}`)
    const data = await res.json()
    console.log({data:data.count})
    setMyRefferals(data.count)
}
const getPoints=async()=>{
  console.log("fetching points")
  const res = await fetch(`${BACK_URL}/api/points/${globalData.global.User._id}`)
  const data = await res.json()
  console.log({"admin points are":data})
  setPoints(data)
  
}


useEffect(()=>{

  if (!globalData || !globalData.global) {
    navigate('/');
  }
  fetchReferrals()
  getPoints()
},[])

  return (
    <div className="container-fluid bg-image">
      <div className="align-items-center home-top">
        <h1 className={"sm:text-3xl text-[20px] my-3"}>Refer & Earn</h1>
        <h3>Hi, {fname} {lname}</h3>
        <h5 className="badge bg-primary p-3 m-2"><strong className='h5'>Amount in your wallet: ₹ ({points/10})</strong></h5>
        <h5 className="badge bg-primary p-3 m-2"><strong className='h5'>Your Total Referral: {refferalPoints}</strong></h5>
      </div>
      <div className='flex mx-auto flex-col w-[90%] md:w-[40%]'>
        <div className="-question-answer-box bg-[#ffffff11] rounded-lg my-3 text-white flex items-center  p-3 shadow-sm ">
          <div className="flex items-center ">
            <img src={'/reward.jpg'} alt="Invite" className="img-fluid me-3" />
            <div>
              <h4>What Will I Get?</h4>
              <p>You will get ₹100 for every referral.</p>
            </div>
          </div>
        </div>
        <div className="-question-answer-box bg-[#ffffff11] rounded-lg my-3 text-white flex items-center  p-3 shadow-sm ">
          <div className="flex items-center ">
            <img src={'./friend-reward.jpg'} alt="Invite" className="img-fluid me-3" />
            <div>
              <h4>What Will My Friend Get?</h4>
              <p>They will also get ₹100 for every referral.</p>
            </div>
          </div>
        </div>
        <div className="-question-answer-box bg-[#ffffff11] rounded-lg my-3 text-white flex items-center  p-3 shadow-sm ">
          <div className="flex items-center ">
            <img src={'earn.jpg'} alt="Invite" className="img-fluid me-3" />
            <div>
              <h4>When Does My Friend Earn?</h4>
              <p>When they successfully refer someone.</p>
            </div>
          </div>
        </div>
        {/* <div className="question-answer-box p-3 shadow-sm mb-4">
          <div className="d-flex align-items-start">
            <img src={friendReward} alt="Invite" className="img-fluid me-3" />
            <div>
              <h4>What Will My Friend Get?</h4>
              <p>They will also get ₹100 for every referral.</p>
            </div>
          </div>
        </div>
        <div className="question-answer-box p-3 shadow-sm mb-4">
          <div className="d-flex align-items-start">
            <img src={earn} alt="Invite" className="img-fluid me-3" />
            <div>
              <h4>When Does My Friend Earn?</h4>
              <p>When they successfully refer someone.</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
