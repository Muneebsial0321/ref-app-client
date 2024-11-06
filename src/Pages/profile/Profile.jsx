import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/style/profile.css';
import img from '../../assets/media/logo.jpg';
import { FaCopy } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { GlobalContext } from '../../context/Global';
import axios from 'axios';
import ProfileModal from '../../component/ProfileModal';
import {BACK_URL} from '../../../ENV'

const Profile = () => {
    const [modal, setModal] = useState(false);
    const [profile, setProfile] = useState(null);
    const [userPoint, setUserPoint] = useState(null);
    const [userReferral, setUserReferral] = useState(null);
    const globalData = useContext(GlobalContext);
    const globalId = globalData.global.User._id
    console.log("Hey", globalId)
    const token = localStorage.getItem('authToken')
    console.log('token is that', token)
    console.log('UserId is ', globalId)

    useEffect(() => {
        const getId = async () => {
            try {
                const token = localStorage.getItem('authToken');

                const response = await axios.get(`${BACK_URL}/api/getUser/${globalId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = response.data;
                console.log(result);
                setProfile(result.user);
                setUserPoint(result.point.point);
                setUserReferral(result.referral.referral);
            } catch (err) {
                console.log(err);
            }
        };
        getId();
    }, [globalId]);


    if (!profile) {
        return <div>Loading...</div>;
    }

    const handleProfileModal = () => {
        if (!modal) {
            setModal(true)
        }
        else {
            setModal(false)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                {/* Profile Information */}
                <div className="col">
                    <div className="row">
                        {/* Profile Picture & Name */}
                        {/* <div className="col-md-3 py-5 text-center profile-data text-light" id='profile-data-img'> */}
                        <div className="col-md-3 py-5 text-center profile-data flex justify-center items-center flex-col text-light" id='profile-data-img'>
                            <img
                                src={img} // Use your default img here or from `profile.image`
                                alt="Profile"
                                className="img-fluid rounded-circle mb-3"
                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                            />
                            <h2>{profile.fname} {profile.lname}</h2>
                        </div>

                        {/* Profile Details */}
                        <div className="col-md-7 py-3 profile-data px-4">
                            <div className='edit'>
                                <FaEdit size={29} className='mb-3' onClick={handleProfileModal} />
                            </div>
                            <div className="flex justify-between flex-col items-center">
                                <h2 className="mb-3">Profile Details</h2>
                                <div className='refrel-code flex justify-center items-center'>
                                    {profile.isApproved === "false" ? (
                                        "UnVerified"
                                    ) : (
                                        <>
                                            {userReferral} <i><FaCopy /></i>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className='p-0'>
                                <p><h5>Name: &nbsp;</h5>{profile.fname} {profile.lname}</p>
                                <p><h5>Email: &nbsp;</h5>{profile.email}</p>
                            
                                <p><h5>Join By: &nbsp;</h5>{profile.referral || "None"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!modal ? '' : <ProfileModal closeModal={handleProfileModal} />}
        </div>
    );
};

export default Profile;
