import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { RegisterUser } from '../../services/api.services'
import { FiMail } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { GiModernCity } from "react-icons/gi";
import { FaPhoneVolume } from "react-icons/fa6";
import { SyncLoader } from "react-spinners";


const SignUpForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [initialData, setInitialData] = useState({
        first_name: '',
        last_name: '',
        city: '',
        phone: '',
        email: '',
        profile_image: '',
    })

    // To handle InputPage1 
    const handleInput = (event) => {
        const { value, id } = event.target
        setInitialData(preVal => ({ ...preVal, [id]: value }))
    }

    // To handle File Input Image 
    const handleFileInput = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setInitialData((prevData) => ({ ...prevData, profile_image: selectedFile }));
        }
    }


    const validation = () => {
        if (initialData.first_name.length === 0) return { isError: false, message: "First Name is missing" }
        else if (initialData.last_name.length === 0) return { isError: false, message: "Last Name is missing" }
        else if (initialData.email.length === 0) return { isError: false, message: "Email is missing" }
        else if (!/^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(initialData.email)) return { isError: false, message: "Please enter the correct email " }
        else if (initialData.phone.length <= 0) return { isError: false, message: "Phone is missing" }
        else if (initialData.phone.length !== 10 || !/^\d{10}$/.test(initialData.phone))
            return { isError: false, message: "Phone number should be a 10-digit number" }
        else if (initialData.email.length === 0) return { isError: false, message: "Email is missing" }
        else if (!initialData.profile_image) return { isError: false, message: "Profile Image is missing" }
        else {
            return { isError: true }
        }
    }


    //to register the form
    const handleRegister = async (e) => {
        e.preventDefault()
        if (validation().isError) {
            setLoading(true)
            //FormData---------------------------------------->
            const formData = new FormData();
            // Append other data
            Object.keys(initialData).forEach((key) => {
                formData.append(key, initialData[key]);
            });
            //FormData---------------------------------------->

            try {
                let res = await RegisterUser(formData)
                console.log(res)
                if (res) {
                    setLoading(false)
                    navigate("/login")
                    toast.success(res.data.message)
                }
            } catch (err) {
                setLoading(false)
                toast.success(err.response.data.message)
            }
        } else {
            setLoading(false)
            toast.warning(validation().message)
        }
    }


    return (
        <section className="registerForm">
            <div className=' bg-gray-600 '>
                <div className=" border border-t-2 border-x-0 mt-[2px] border-b-0 border-white dark:bg-gray-800 flex items-center justify-center px-5 py-5">
                    <div
                        className="max-w-[1000px] bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
                    >
                        <div className="md:flex w-full">
                            <div className='hidden md:block object-left sm:w-[400px] lg:w-[500px] sm:h-[500px]'>
                                <img className='' src="/img/signin.jpg" alt='register' />
                            </div>

                            <div className="w-full md:w-1/2 py-5 px-5 md:px-10">
                                <div className="text-center mb-10">
                                    <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                                    <p>Enter your information to register</p>
                                </div>
                                <div>
                                    <div className="flex -mx-3">
                                        <div className="w-1/2 px-3 mb-3.5">
                                            <label htmlFor="" className="text-xs font-semibold px-1"> First name</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <HiOutlineUser />
                                                </div>
                                                <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="John"
                                                    id='first_name'
                                                    value={initialData.first_name}
                                                    onInput={handleInput} />
                                            </div>
                                        </div>
                                        <div className="w-1/2 px-3 mb-3.5">
                                            <label htmlFor="" className="text-xs font-semibold px-1">Last name</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <HiOutlineUser />
                                                </div>
                                                <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="Smith"
                                                    id='last_name'
                                                    value={initialData.last_name}
                                                    onInput={handleInput} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex -mx-3">
                                        <div className="w-1/2 px-3 mb-4">
                                            <label htmlFor="" className="text-xs font-semibold px-1"> City</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <GiModernCity />
                                                </div>
                                                <input type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="sonipat"
                                                    id='city'
                                                    value={initialData.city}
                                                    onInput={handleInput} />
                                            </div>
                                        </div>
                                        <div className="w-1/2 px-3 mb-3.5">
                                            <label htmlFor="" className="text-xs font-semibold px-1">Phone</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <FaPhoneVolume />
                                                </div>
                                                <input type="tel" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="9891957558"
                                                    id='phone'
                                                    value={initialData.phone}
                                                    onInput={handleInput} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5">
                                            <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                    <FiMail />
                                                </div>
                                                <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="johnsmith@example.com"
                                                    id='email'
                                                    value={initialData.email}
                                                    onInput={handleInput} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5">
                                            <label htmlFor="" className="text-xs font-semibold px-1">Profile Picture</label>
                                            <div className="flex">
                                                <input type="file" className="w-full pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="************"
                                                    id='profile_image'
                                                    onInput={handleFileInput} />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5">
                                            <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                                                onClick={handleRegister}>
                                                {loading ? <SyncLoader size={8} color="#fff" /> : " REGISTER NOW"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-black text-center">Already have an account? <br />
                                        <NavLink to="/login" className='text-blue-500 cursor-pointer hover:text-blue-700' >Login now</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUpForm