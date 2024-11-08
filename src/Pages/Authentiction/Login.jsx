import React, { useContext, useState } from 'react'
import '../../assets/style/signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';
import { GlobalContext } from '../../context/Global';
import { BACK_URL } from '../../../ENV'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


function Login() {
    const global = useContext(GlobalContext)
    const navigate = useNavigate()
    console.log(global)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    })

    const handleInputChange = (e) => {
        console.log({ BACK_URL })
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please fill the form!");
            return;
        }

        console.log(formData);

        try {
            const response = await axios.post(`${BACK_URL}/api/login`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const token = response.data.token;
                console.log("Data for Token is", response.data);
                localStorage.setItem('authToken', token);
                global.setGlobal(response.data)
                // alert('Login Successfully');
                if (response.data.User.isBlocked === "true") {
                    toast.info("You have permanent Blocked on this site!");
                    navigate('/block')
                }
                else {
                    toast.success("Login successful!", {
                        position: "top-center"
                    });
                    navigate('/home');
                }
            } else {
                toast.error("Invalid User!", {
                    position: "top-center"
                });
            }
        } catch (err) {
            console.error('Error during login:', err);
            toast.error("Invalid User!", {
                position: "top-center"
            });
        }
    };


    return (
        <>
            <div className="signup-container relative top-[0rem]">
                <div className="-signup-form text-[#fff] lg:bg-[#2B2738] backdrop-blur-md md:w-[70%] w-[100vw] flex max-lg:flex-col md:justify-between rounded-2xl p-10 items-center ">
                    <div className="signup-form-left w-[20rem]">
                        <Swiper
                            modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
                            effect="coverflow"
                            spaceBetween={0}
                            slidesPerView={1}
                            loop={true}
                            pagination={{ clickable: true }}
                            // scrollbar={{ draggable: true }}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                        >
                            <SwiperSlide><img src={'signup.jpg'} alt="" width={"100%"} /></SwiperSlide>
                            <SwiperSlide><img src={'signup2.jpg'} alt="" width={"100%"} /></SwiperSlide>
                            <SwiperSlide><img src={'signup3.jpg'} alt="" width={"100%"} /></SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="-signup-form-right login-right">
                        <h4 className={"w-[18rem] text-center"} >Login Here </h4>
                        <form
                            className="flex flex-col justify-center items-center"
                            onSubmit={handleSubmit}>
                            <div className="signup-email">
                                <input
                                    className="bg-[#3B364C] w-[19rem] p-[6px] my-[10px] rounded-[6px] border-[#6E54B5] border-solid border-[1px]"
                                    type="email" name="email" id="" value={formData.email} placeholder='Email' onChange={handleInputChange} />
                            </div>
                            <div className="signup-password">
                                <input type="password"
                                    className="bg-[#3B364C] w-[19rem] p-[6px] my-[10px] rounded-[6px] border-[#6E54B5] border-solid  border-[1px] "
                                    name="password" id="" value={formData.password} placeholder='Enter Password' onChange={handleInputChange} />
                            </div>
                            <button
                                className='bg-[#6E54B5] my-[10px] w-[19rem] rounded-[6px] border-none'
                                type='submit'>Login</button>
                        </form>
                        <ToastContainer />
                        <div className="flex gap-6 justify-center items-center">
                            <p><Link to='/signup'>Signup</Link></p>
                            <p><Link to='/forget'>Reset Password</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
