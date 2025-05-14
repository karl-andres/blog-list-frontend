import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleBlogUpdate, handleBlogRemoval }) => {
  const [fullVisibility, setFullVisibility] = useState(false)
  const [totalLikes, setTotalLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = async (event) => {
    const updatedBlog = {
      ...blog, 
      likes: blog.likes + 1
    }
    setTotalLikes(updatedBlog.likes)
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    handleBlogUpdate(returnedBlog)
  }

  const handleRemove = async (event) => {
    handleBlogRemoval(blog)
  }

  const hideWhenVisible = { display: fullVisibility ? 'none' : '' }
  const showWhenVisible = { display: fullVisibility ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author}
        <button onClick={() => setFullVisibility(true)}>view</button>
      </div> 
      <div style={showWhenVisible}>
        <button onClick={() => setFullVisibility(false)}>hide</button>
        <div>{blog.title}</div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          {blog.likes} likes
          <button onClick={handleLikes}>like</button>
        </div>
        <div>{blog.author}</div>
        <button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog