import React, { useEffect, useState } from 'react'
import { BlogDeleteAPI, BlogGetAPI } from '../../services/api.services'
import { toast } from 'react-toastify'
import BlogForm from '../../components/BlogForm'
import { MdAddCircle } from 'react-icons/md'

const Blog = () => {
    const [blogData, setBlogData] = useState([])
    const [showBlogForm, setShowBlogForm] = useState(false);

    //handling fetching the data
    const getBlogData = async () => {
        await BlogGetAPI().then((res) => {
            setBlogData(res.data.data.data)
            console.log(res.data.data.data)
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        getBlogData()
    }, [])

    //handling delete the blog
    const handleDeleteBlog = async (id) => {
        await BlogDeleteAPI(id).then((res) => {
            console.log(res)
            toast.success("Blog deleted successfully")
            getBlogData()
        }).catch((err) => console.log(err))
    }

    return (
        <>
            <section className="pt-20 pb-10 lg:pb-20  bg-white dark:bg-dark">
                <div className="container mx-auto">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 flex flex-row relative" >
                            <div className="mx-auto mb-[60px] max-w-[700px] text-center lg:mb-20">
                                <h2 className="text-[26px] w-full py-4 sm:text-4xl md:text-3xl lg:text-[41px] font-semibold mb-2 bg-gradient-to-l from-yellow-600 to-yellow-400 bg-clip-text text-transparent">
                                    Our Blogs
                                </h2>
                                <p className="text-md sm:text-lg px-4 sm:px-0 md:text-xl font-medium sm:text-center  text-gray-600 leading-relaxed">
                                    Delving into the world of cutting-edge technology, our blog explores the intricacies of digital innovation, reshaping the landscape of modern solutions and redefining the way we perceive technological advancements.                                </p>
                            </div>
                            <div className="text-center">
                                <button className="bg-yellow-500 absolute hidden sm:block right-4 top-0 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setShowBlogForm(true)}
                                >
                                    Add Blog
                                </button>
                                <button className="bg-yellow-500 absolute sm:hidden right-4 top-0 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => setShowBlogForm(true)}
                                >
                                    <MdAddCircle />
                                </button>
                            </div>
                        </div>
                    </div>

                    {showBlogForm && <BlogForm setShowBlogForm={setShowBlogForm} />}

                    <div className="flex flex-row w-full flex-wrap gap-10 justify-center px-4 sm:px-0">
                        {blogData && blogData.map((item, index) => {
                            return (
                                <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-lg shadow-darkblack  ">
                                    <div className="w-full mb-10 ">
                                        <div className="overflow-hidden rounded ">
                                            <img
                                                src={item.attachment}
                                                alt={`blog${index}`}
                                                className="w-full"
                                            />
                                        </div>
                                        <div className='px-4'>
                                            <span className="inline-block mt-2  py-1 mb-5 text-xs font-semibold leading-loose text-center bg-gradient-to-r from-black to-yellow-400 bg-clip-text text-transparent rounded bg-primary">
                                                {item.date}
                                            </span>
                                            <h3 className="inline-block mb-4 text-xl font-semibold text-black hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl">
                                                {item.title}
                                            </h3>
                                            <p className="text-base text-body-color dark:text-dark-6">
                                                {`${(item.description).slice(0, 50)}`}
                                            </p>

                                            <button className="mt-3  text-yellow-400  inline-flex items-center">
                                                Read More
                                            </button>
                                            <button className="mt-3 float-right  text-red-500  inline-flex items-center"
                                                onClick={() => handleDeleteBlog(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </section >
        </>

    )
}

export default Blog