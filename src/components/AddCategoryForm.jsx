import React, { useState, useEffect } from "react"
import { toast } from "react-toastify";
import { CategoryCreateAPI, CategoryDeleteAPI, CategoryGetAPI, CategoryUpdateAPI } from "../services/api.services";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";



// code start 
const AddCategoryForm = () => {
    const { user } = useSelector((state) => state.root.auth)  
    const [loading, setLoading] = useState(false);
    const [changeButton, setChangeButton] = useState(false)
    const [inputCategory, setInputCategory] = useState("")
    const [rowIndex, setRowIndex] = useState("")
    const [editInputSpanToggle, setEditInputSpanToggle] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const [initialData, setInitialData] = useState({
        name: "",
        user_detail: user
    })

    const handleSubmitTodo = async () => {
        if (initialData) {
            if (!initialData.name) toast.warning("Please input the category data")
            else {
                await CategoryCreateAPI(initialData).then((res) => {
                    setInitialData({ name: "", user_detail: user })
                    getCategoryData()
                    toast.success(`Category added successfully`)
                }).catch((err) => {
                    toast.error(err.respone.data.message)
                })
            }
        } else {
            toast.warning('Please fill Category')
        }
    }

    const getCategoryData = async () => {
        await CategoryGetAPI().then((res) => {
            setCategoryData(res.data.data.data.reverse())
            setLoading(false);
        }).catch((err) => {
            console.log(err)
            setLoading(false);
        })
    }

    useEffect(() => {
        setLoading(true)
        getCategoryData()
    }, [])


    const handleDeleteCategory = async (id) => {
        await CategoryDeleteAPI(id).then((res) => {
            getCategoryData()
            toast.success(res?.data?.message)
        }).catch((err) => console.log(err))
    }

    const handleEditCategory = (name, index) => {
        setInputCategory(name)
        setChangeButton(true)
        setEditInputSpanToggle(true)
        setRowIndex(index)
    }

    const handleSaveCategory = async (id) => {
        await CategoryUpdateAPI(id, { name: inputCategory }).then((res) => {
            setChangeButton(false)
            setEditInputSpanToggle(false)
            toast.success("Category updated successfully")
            getCategoryData()
            setCategoryData(null)
        }).catch((err) => console.log(err))
    }


    return (
        <div className="main-content mt-16 ">
            <div className="page-content">
                <div className="container-fluid " >


                    {/* Main Section Start*/}
                    <section className="px-4">
                        <div className="flex justify-between align-center my-16 mt-28 sm:px-3 px-1"  >
                            <div className="flex flex-col w-full flex-wrap sm:flex-row align-center justify-end gap-2 ">
                                <div className="card-body w-full">
                                    <div className="flex column flex-col px-8 w-full justify-center sm:justify-end sm:flex-row align-center gap-2">
                                        <input type="text" className=" w-[250px] h-[42px] rounded-lg text-black px-4 border-none outline-none bg-gray-200 "
                                            id="name"
                                            value={initialData.name}
                                            placeholder="Add new . . . "
                                            onChange={(e) => setInitialData((prev) => ({ ...prev, name: e.target.value }))} />

                                        <div>
                                            {/* <!-- Button trigger modal --> */}
                                            <button type="button" className="bg-blue-600 text-white py-2 px-4 whitespace-nowrap rounded-lg"
                                                onClick={handleSubmitTodo}>
                                                Add Category
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className=" text-white max-w-[800px] block mx-auto rounded-lg" style={{ background: "#3c3f4c" }} >
                            <ul className="flex-row flex justify-evenly w-100 mb-0" style={{ borderBottom: "1px solid white" }}>
                                <li className=" py-2 w-1/5 hidden sm:ml-6 sm:block">Id</li>
                                <li className=" py-2 -ml-3 sm:-ml-0 w-2/5 sm:w-3/5 ">Category Name</li>
                                <li className=" py-2 sm:w-1/5">Actions</li>
                            </ul>

                            {loading ? (
                                <div className="flex justify-center items-center h-[200px]">
                                    <SyncLoader size={20} color="#fff" />
                                </div>
                            ) : (
                                <>
                                    {categoryData?.map((item) => {

                                        return (
                                            <ul key={item.id} className="flex-row flex justify-evenly w-100 mb-0" style={{ borderBottom: "1px solid white" }}>
                                                <li className=" text-[14px] sm:ml-6 hidden sm:block py-2 w-1/5">{item.id}</li>
                                                <li className=" text-[14px] py-2 w-2/5 sm:w-3/5">
                                                    {
                                                        (editInputSpanToggle && rowIndex === item.id) ?
                                                            <input type="text" className="w-[150px] sm:w-[300px] h-[28px] rounded-lg text-black px-4 border-none outline-none bg-gray-200 "
                                                                id="name"
                                                                value={inputCategory}
                                                                onChange={(e) => setInputCategory(e.target.value)} />

                                                            :
                                                            <span> {item.name}</span>
                                                    }
                                                </li>

                                                <li className=" text-[14px] py-2 sm:w-1/5 flex flex-row gap-4">
                                                    {(changeButton && rowIndex === item.id) ?
                                                        <div className="text-green-500 cursor-pointer"
                                                            onClick={() => handleSaveCategory(item.id)}
                                                        >
                                                            Save
                                                        </div>
                                                        :
                                                        <div className="text-green-500 cursor-pointer"
                                                            onClick={() => handleEditCategory(item.name, item.id)}
                                                        >
                                                            Edit
                                                        </div>
                                                    }

                                                    <div className="text-red-500 cursor-pointer"
                                                        onClick={() => handleDeleteCategory(item.id)}
                                                    >
                                                        Delete
                                                    </div>
                                                </li>
                                            </ul>
                                        )
                                    }
                                    )}
                                </>
                            )}




                        </div>

                    </section>
                </div>
            </div>
        </div>

    )
}

export default AddCategoryForm;






