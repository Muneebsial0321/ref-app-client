import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/style/wallet.css'
import { CiSquarePlus } from "react-icons/ci";
import { GlobalContext } from '../../context/Global';
import {BACK_URL} from '../../../ENV'

const Wallet = () => {
  const [refferalPoints, setMyRefferals] = useState(0)
  const globalData = useContext(GlobalContext);

  const userPoint = globalData.global.points.point;
  const userId = globalData.global.User._id
  const approved = globalData.global.User.isApproved
  console.log(userId)
  console.log(approved)
  const userBalance = userPoint / 10;
  const [image, setImage] = useState(null);
  const [balanceData] = useState({
    totalBalance: 5000,
    totalReferrals: 10,
  });

  const fetchReferrals=async()=>{
    console.log("fetching data")
    const res = await fetch(`${BACK_URL}/api/refs/${globalData.global.User._id}`)
    const data = await res.json()
    console.log({data:data.count})
    setMyRefferals(data.count)
}

  const handleImage = (e) => {
    const myImage = e.target.files[0];
    if (myImage) {
      setImage(myImage);  // Store the file itself
    }
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    // Create a new FormData object to hold the file and any additional data
    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', userId);  // Replace with the actual user ID or fetch from context

    try {
      // Send a POST request with the form data
      const response = await fetch(`${BACK_URL}/api/approve`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload the image');
      }

      const result = await response.json();
      alert(result.msg);  // Handle success
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };
  useEffect(()=>{fetchReferrals()},[])

  return (
    <div className="container mt-5 p-5 wallet-box shadow rounded">
      <div className="row">
        {/* Left Side: Wallet Details */}
        <div className="col-md-5 text-light">
          <h3 className="mb-4">Wallet</h3>
          <div className="mb-3">
            <h5>Total Balance</h5>
            <p className="fs-4">₹ ({userBalance})</p>
          </div>
          <div>
            <h5>Total Referrals</h5>
            <p className="fs-4">{refferalPoints}</p>
          </div>
        </div>
        {/* Right Side: UPI Transfer */}
        {approved === "false" ?
          <div className="col-md-7 text-light">
            <h3 className="mb-4">UPI Transfer</h3>
            <div className='upload-img'>
              {image ? <img src={URL.createObjectURL(image)} alt="Uploaded preview" /> : ""}
              <input type="file" accept="image/*" id="fileInput" onChange={handleImage} />
              {!image && <CiSquarePlus size={29} className='upload-icon' onClick={() => document.getElementById('fileInput').click()} />}
            </div>
            <button className='btn btn-dark mt-3' onClick={handleUpload}>Upload</button>
          </div> : <h3 className="mb-4">UPI Transfer</h3>
        }

      </div>
    </div>
  );
};

export default Wallet;
