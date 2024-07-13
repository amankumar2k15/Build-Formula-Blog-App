import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"

const Header = () => {
    const [hide, setHide] = useState(false);
    const [list, setList] = useState(true);
    const { user } = useSelector((state) => state.root.auth)  //This root is just bcoz of combine reducer

    return (
        <nav className="fixed px-4 top-0 left-0 right-0 border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700" style={{ zIndex: "100" }}>
            <div className="flex justify-between relative flex-wrap md:flex-nowrap md:whitespace-nowrap items-center p-4">
                <div href="#" className="flex items-center gap-2">
                    <Link to="/dashboard/blog" className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Blog<span className='text-[red] text-lg'>App</span></Link>
                </div>

                {/* -----End Text ----- */}
                <div className="flex md:hidden items-center md:order-2 gap-1">

                    <button data-collapse-toggle="navbar-user" type="button"
                        className="inline-flex items-center z-50 p-2 w-10 h-10 absolute right-0 top-4 justify-center text-sm  text-white rounded-lg md:hidden focus:outline-none  dark:text-black-400  " aria-controls="navbar-user" aria-expanded="false"
                        onClick={() => setHide(!hide)}
                    >
                        {
                            hide ?
                                <RxCross2 size={20} />
                                :
                                <GiHamburgerMenu size={20} />
                        }
                    </button>
                </div>

                <div className='hidden sm:block textParent'>
                    <div className='textChild text-white text-xl tracking-widest'>Welcome <span className='text-[red]'>{`${user.first_name} ${user.last_name}`}</span></div>
                </div>

                {/* ----Middle Text---- */}
                <div className={`${hide ? "visible absolute md:relative  md:top-auto top-16 transition-all duration-700 ease-in-out " : "-top-[400px]  md:right-auto"} md:w-[70px] block w-full right-[2px] `}>
                    <div className={` ${hide ? "visible" : "hidden"} justify-end bg-white md:bg-transparent w-full items-center  shadow-lg rounded-lg md:border-none md:shadow-none md:flex md:w-auto md:order-1 `} id="navbar-user">
                        <ul className={`flex flex-col md:flex-row font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700 gap-2 md:gap-0 transition-all duration-300 ease-in-out`}>
                            <li className="relative group">
                                <Link to="/dashboard/blog" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
                                    onClick={() => setHide(false)}>
                                    Blog
                                </Link>
                                <ul className={`${list ? "hidden" : "block"} absolute top-10 md:top-6 left-0 md:-left-16 space-y-2 text-red-500 bg-white border dark:bg-gray-800 dark:border-gray-700 border-gray-200 rounded-md group-hover:block`}>
                                    <li onClick={() => setHide(false)}>
                                        <Link to="/dashboard/blog-list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:text-blue-500 dark:hover:bg-gray-700">
                                            Blog List
                                        </Link>
                                    </li>
                                    <li onClick={() => setHide(false)} >
                                        <Link to="/dashboard/categories-list" className="block px-4 whitespace-nowrap py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:text-blue-500 dark:hover:bg-gray-700">
                                            Blog Category List
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/dashboard/profile" className="block  py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                    onClick={() => setHide(false)}
                                >

                                    Profile
                                </Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </nav>


    );
}

export default Header;
