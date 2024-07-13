// LoginForm.js
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiMail } from "react-icons/fi"
import { RiLockPasswordFill } from "react-icons/ri"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { LoginUser } from '../../services/api.services'
import { login } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { SyncLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { setData, setToken } from '../../helper/tokenHelper'



const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [hide, setHide] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const handleInput = (event) => {
        const { value, id } = event.target
        setCredentials((preVal) => ({ ...preVal, [id]: value }))
    }

    const validation = () => {
        if (credentials.email.length === 0) return { isError: false, message: "Email is missing" }
        else if (credentials.password.length === 0) return { isError: false, message: "Password is missing" }
        else {
            return { isError: true }
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (validation().isError) {
            setLoading(true)
            //FormData---------------------------------------->
            const formData = new FormData();
            // Append other data
            Object.keys(credentials).forEach((key) => {
                formData.append(key, credentials[key]);
            });
            //FormData---------------------------------------->

            try {
                let res = await LoginUser(credentials)
                console.log(res)
                if (res) {
                    setLoading(false)
                    dispatch(login({ user: res.data.data }));
                    toast.success(res.data.message)
                    setToken(res?.data?.data?.token)
                    localStorage.setItem('isAuthenticated', true);
                    setData(res?.data?.data)
                    navigate("/dashboard/blog")
                }

            } catch (err) {
                setLoading(false)
                toast.error(err?.response?.data?.message)
            }

        } else {
            setLoading(false)
            toast.warning(true, validation().message)
        }
    }


    return (
        <section className="loginForm">
            <div className=' bg-gray-600 '>
                <>
                    <div className=" border border-t-2 border-x-0 border-b-0 border-white dark:bg-gray-800 flex items-center justify-center px-5 py-[68px]">
                        <div
                            className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl py-[3px] w-full overflow-hidden"
                            style={{ maxWidth: 1000 }}
                        >
                            <div className="md:flex w-full">
                                <div className='hidden md:block sm:w-[500px] sm:h-[400px]'>
                                    <img className='' src="/img/login.jpg" alt='Login' />
                                </div>

                                <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                                    <div className="text-center mb-10">
                                        <h1 className="font-bold text-3xl text-gray-900">LOGIN</h1>
                                        <p>Enter your information to login</p>
                                    </div>
                                    <div>

                                        <div className="flex -mx-3">
                                            <div className="w-full px-3 mb-5">
                                                <label htmlFor="" className="text-xs font-semibold px-1">Email</label>
                                                <div className="flex">
                                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                        <FiMail />
                                                    </div>
                                                    <input type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="johnsmith@example.com"
                                                        id='email'
                                                        value={credentials.email}
                                                        onChange={handleInput}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex -mx-3">
                                            <div className="w-full px-3 mb-12">
                                                <label htmlFor="" className="text-xs font-semibold px-1">Password</label>
                                                <div className="flex">
                                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                        <RiLockPasswordFill />
                                                    </div>
                                                    <input type={`${hide ? "password" : "text"}`} className="w-full -ml-10 pl-10 pr-3 py-2 rounded-s-lg border-2 border-gray-200 outline-none focus:border-gray-600 text-gray-900" placeholder="************"
                                                        id='password'
                                                        value={credentials.password}
                                                        onChange={handleInput}
                                                    />
                                                    <div onClick={() => setHide(!hide)} className='w-10 h-11 flex justify-center items-center bg-gray-400 rounded-e-lg'>
                                                        {hide ?
                                                            <AiFillEyeInvisible className='text-black ' size={20} />
                                                            :
                                                            <AiFillEye className='text-black ' size={20} />
                                                        }
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex -mx-3">
                                            <div className="w-full px-3 mb-5">
                                                <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                                                    onClick={handleLogin}>
                                                    {loading ? <SyncLoader size={8} color="#fff" /> : "LOGIN"}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-black text-center">Don't have an account? <br />
                                            <NavLink to="/register" className='text-blue-500 cursor-pointer hover:text-blue-700'>Register now</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </section>
    );
};

export default LoginForm;
