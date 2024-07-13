import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/slices/authSlice'
import { MdEdit } from "react-icons/md";
import { MdEditOff } from "react-icons/md";
import { ProfileUpdateAPI } from '../../services/api.services';
import store from '../../store/store';
import { toast } from 'react-toastify';


const Profile = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const dispatch = useDispatch()
    const [isEdit, setEdit] = useState(false)
    const { user } = useSelector((state) => state.root.auth)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        dispatch(login({ user: { ...user, [name]: value } }))
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        const fileUrl = URL.createObjectURL(file);
        dispatch(login({ user: { ...user, profile_image: fileUrl } }))
    };

    const handleEditUpdateButton = async () => {
        setEdit(false)
        try {
            const formData = new FormData();
            formData.append('first_name', user.first_name);
            formData.append('last_name', user.last_name);
            formData.append('email', user.email);
            formData.append('city', user.city);
            formData.append('phone', user.phone);
            if (selectedFile) {
                formData.append('profile_image', selectedFile);
            }

            await ProfileUpdateAPI(formData);
            toast.success("Profile updated successfully")
            setSelectedFile(null);
            setEdit(false);
        } catch (error) {
            setEdit(false)
            console.error('Error updating user:', error);
        }
    }

    return (
        <div className='w-full flex justify-center align-center mt-24'>
            <div className="bg-white max-w-[1000px] shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        User Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Details and informations about user.
                    </p>
                </div>
                <div className="border-t relative md:w-[600px] border-gray-200 flex flex-col sm:flex-row">
                    <div className='flex flex-row justify-center align-center'>
                        <div className="md:flex md:items-center mb-6">

                            <div className="flex items-center h-full justify-center mt-4 sm:mt-0 ">
                                <label
                                    htmlFor="profile_image"
                                    className="flex flex-col items-center justify-center w-48 h-48 rounded-[50%] border-2 border-gray-300 border-dashed cursor-pointer bg-gray-200 "
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {selectedFile ? (
                                            <>
                                                <img
                                                    className="w-[200px] h-[200px] object-cover rounded-full"
                                                    src={URL.createObjectURL(selectedFile)}
                                                    alt="Selected Img!"
                                                />
                                            </>
                                        ) : (
                                            <img
                                                className="w-[200px] h-[200px] object-cover rounded-full"
                                                src={user.profile_image}
                                                alt="Current Img!"
                                            />
                                        )}
                                    </div>
                                    <input className="hidden" id='profile_image' name="profile_image" type="file" onChange={handleFileInput} />

                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">First name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEdit ? (
                                    <input className='border w-[200px] border-gray-500 h-8 px-2 rounded-lg focus:outline-none'
                                        type="text"
                                        name="first_name"
                                        value={user?.first_name}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    `${user?.first_name}`
                                )}
                            </dd>
                        </div>

                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEdit ? (
                                    <input className='border w-[200px] border-gray-500 h-8 px-2 rounded-lg focus:outline-none'
                                        type="text"
                                        name="last_name"
                                        value={`${user?.last_name}`}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    `${user?.last_name}`
                                )}
                            </dd>
                        </div>

                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Email address</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEdit ? (
                                    <input className='border w-[200px] border-gray-500 h-8 px-2 rounded-lg focus:outline-none'
                                        type="text"
                                        name="email"
                                        value={`${user?.email}`}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    `${user?.email}`
                                )}
                            </dd>
                        </div>

                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">City</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEdit ? (
                                    <input className='border w-[200px] border-gray-500 h-8 px-2 rounded-lg focus:outline-none'
                                        type="text"
                                        name="city"
                                        value={`${user?.city}`}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    `${user?.city}`
                                )}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEdit ? (
                                    <input className='border w-[200px] border-gray-500 h-8 px-2 rounded-lg focus:outline-none'
                                        type="text"
                                        name="phone"
                                        value={`${user?.phone}`}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    `${user?.phone}`
                                )}
                            </dd>
                        </div>
                    </div>

                    <div className='icon cursor-pointer absolute top-2 right-2'

                    >
                        {isEdit ?
                            <MdEdit size={20} onClick={handleEditUpdateButton} /> :
                            <MdEditOff size={20} onClick={() => setEdit(!isEdit)} />}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile