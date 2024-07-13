import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: "blog",
    initialState: {
        data: {
            title: "",
            description: "",
            category_id: [],
            attachment: ""
        }
    },
    reducers: {
        setBlogData: (state, action) => {
            state.data = action.payload.data
        }
    }
})

// export const selectBlog = (state) => state.blog
export const { setBlogData } = blogSlice.actions
export default blogSlice.reducer