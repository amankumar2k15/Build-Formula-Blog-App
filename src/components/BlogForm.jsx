import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogData } from '../store/slices/blogSlice';
import { SyncLoader } from "react-spinners";
import { BlogCreateAPI } from '../services/api.services';
import { toast } from 'react-toastify';

const BlogForm = ({ setShowBlogForm }) => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { data } = useSelector((state) => state.root.blog)
    console.log(data)

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "category_id") {
            const categoriesArray = value.split(',').map(category => category.trim());
            dispatch(setBlogData({ data: { ...data, [name]: categoriesArray } }));
        } else {
            dispatch(setBlogData({ data: { ...data, [name]: value } }));
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file)
        const fileUrl = URL.createObjectURL(file);
        dispatch(setBlogData({ data: { ...data, attachment: fileUrl } }))
    };


    const clearFileInput = (selectedKey) => {
        const fileInput = document.getElementById(selectedKey);
        if (fileInput) {
            fileInput.value = null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        //FormData---------------------------------------->
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category_id', JSON.stringify(data.category_id));
        if (selectedFile) {
            formData.append('attachment', selectedFile);
        }
        //FormData---------------------------------------->
        console.log("formData", formData)
        try {
            let res = await BlogCreateAPI(formData)
            console.log(res)
            if (res) {
                dispatch(setFormValue({
                    data: {
                        title: null,
                        description: null,
                        category_id: [],
                    }
                }))
                // clearFileInput('attachment');
                document.getElementById("attachment").value = null

                setLoading(false)
                setShowBlogForm(false)
                setSelectedFile(null);
                toast.success(res.data.message)
            }
        } catch (err) {
            setLoading(false)
            toast.success(err.response.data.message)
        }

    };

    return (

        <div className='w-full bg-red-600 px-4'>
            <div className="my-8 p-4 fixed top-14 bg-[#1f2937] text-white rounded-md">
                <div className='max-w-[600px] mx-auto'>
                    <h2 className="text-2xl font-semibold mb-4 text-white">Add a New Blog</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={data?.title || ""}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full border text-black border-gray-300 dark:border-dark-5 rounded-md focus:outline-none focus:ring focus:border-yellow-500 dark:focus:border-yellow-500 dark:bg-dark-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={data?.description || ""}
                                onChange={handleChange}
                                rows="4"
                                className="mt-1 p-2 block w-full border border-gray-300 text-black dark:border-dark-5 rounded-md focus:outline-none focus:ring focus:border-yellow-500 dark:focus:border-yellow-500 dark:bg-dark-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="category_ids" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Categories
                            </label>
                            <input
                                type="text"
                                id="category_id"
                                name="category_id"
                                value={data?.category_id.join(', ') || ""}
                                onChange={handleChange}
                                className="mt-1 p-2 block w-full text-black border border-gray-300 dark:border-dark-5 rounded-md focus:outline-none focus:ring focus:border-yellow-500 dark:focus:border-yellow-500 dark:bg-dark-2"
                            />

                        </div>
                        <div className="mb-4">
                            <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Attachment
                            </label>
                            <input
                                type="file"
                                id="attachment"
                                name="attachment"
                                onChange={handleFileInput}
                                className="mt-1 p-2 block w-full border border-gray-300 dark:border-dark-5 rounded-md focus:outline-none focus:ring focus:border-yellow-500 dark:focus:border-yellow-500 dark:bg-dark-2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                        >
                            {loading ? <SyncLoader size={8} color="#fff" /> : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default BlogForm;


