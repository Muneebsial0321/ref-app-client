import React, { useContext, useEffect, useState } from 'react'
import '../../assets/style/signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import img1 from '../../assets/media/signup.jpg'
import img2 from '../../assets/media/signup2.jpg'
import img3 from '../../assets/media/signup3.jpg'
import axios from 'axios';
import { GlobalContext } from '../../context/Global';
import { BACK_URL } from '../../../ENV'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function Signup() {
    const [offer, setOffer] = useState([])
    const global = useContext(GlobalContext)

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmpassword: '',
        referal: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmpassword) {
            toast.error("Passwords do not match!", {
                position: "top-center"
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/signup', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) {
                toast.success("User Created Successfully", {
                    position: "top-center"
                });
                setInterval(() => {
                    navigate('/home');
                }, 1500)
            }
            else {
                toast.error("User Alread Created!", {
                    position: "top-center"
                });
            }
        } catch (err) {
            console.log(err)
            toast.error("Server Error!", {
                position: "top-center"
            });
        }
    };

    // get Offer 
    useEffect(() => {
        const getOffer = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/offer')
                const result = response.data
                setOffer(result)

            }
            catch (err) {
                console.log("Offer error is that ", err)
            }
        }
        getOffer()
    }, [])
    console.log('Offer response is that ', offer)

    return (
        <>
            <div className="signup-container">
                <div className="signup-form ">
                    <div className="signup-form-left">
                        <Swiper
                            modules={[EffectCoverflow, Pagination, Autoplay]} effect="coverflow"
                            spaceBetween={0}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            loop={true}
                            // scrollbar={{ draggable: true }}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                        >
                            {
                                offer.map((offer, i) => {
                                    return <SwiperSlide key={i}><img src={`http://localhost:3001${offer.imageUrl}`} alt="Loading Error" width={"100%"} /></SwiperSlide>
                                })
                            }
                        </Swiper>
                    </div>
                    <div className="signup-form-right">
                        <h4>Create an Account</h4>
                        <form action="" onSubmit={handleSubmit}>
                            <div className="signup-name">
                                <input type="text" name="fname" value={formData.fname} id="" placeholder='First Name' onChange={handleInputChange} />
                                <input type="text" name="lname" id="" value={formData.lname} placeholder='Last Name' onChange={handleInputChange} />
                            </div>
                            <div className="signup-email">
                                <input type="email" name="email" id="" value={formData.email} placeholder='Email' onChange={handleInputChange} />
                            </div>
                            <div className="signup-password">
                                <input type="password" name="password" id="" value={formData.password} placeholder='Enter  Password' onChange={handleInputChange} />
                            </div>
                            <div className="signup-password">
                                <input type="password" name="confirmpassword" id="" value={formData.confirmpassword} placeholder='Confirm  Password' onChange={handleInputChange} />
                            </div>
                            <div className="signup-refrel">
                                <input type="text" name="referal" id="" value={formData.referal} placeholder='Refrerral Code (Optional)' onChange={handleInputChange} />
                            </div>
                            <button type='submit'>Create Account</button>
                        </form>
                        <p>if you already have an account &nbsp;&nbsp;&nbsp;<Link to='/login'>login</Link></p>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default Signup
