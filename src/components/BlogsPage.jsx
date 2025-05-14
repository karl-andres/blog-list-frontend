import { useState, useEffect } from 'react'
import Blog from './Blog'
import BlogsForm from './BlogsForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const BlogsPage = ({ setUser, setErrorMessage, setNotification }) => {
    const [blogs, setBlogs] = useState([])
    const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

    useEffect(() => {
      blogService.getAll().then(blogs => {
        const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      })  
    }, [])

    const handleLogout = async (event) => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const handleBlogUpdate = async (updatedBlog) => {
        try {
            const updatedBlogs = blogs.map(blog => 
                blog.id === updatedBlog.id ? updatedBlog : blog
            )
            const sortedBlogs = [...updatedBlogs].sort((a, b) => b.likes - a.likes)
            setBlogs(sortedBlogs)
        } catch (error) {
            setErrorMessage('Error updating blog')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleBlogRemoval = async (blogToRemove) => {
        try {
            if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)) {
                await blogService.remove(blogToRemove.id)
                const updatedBlogs = blogs.filter(blog => blog.id !== blogToRemove.id)
                const sortedBlogs = [...updatedBlogs].sort((a, b) => b.likes - a.likes)
                setBlogs(sortedBlogs)
                setNotification(`Removed '${blogToRemove.title}'`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            }
        } catch (error) {
            setErrorMessage('Error removing blog')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const createBlog = async (blogObject) => {
        try {
            const returnedBlog = await blogService.create(blogObject)
            const newBlogsArray = [...blogs, returnedBlog]
            const sortedBlogs = newBlogsArray.sort((a, b) => b.likes - a.likes)
            setBlogs(sortedBlogs)
            setNotification(`a new blog ${blogObject.title} by ${blogObject.author}`)
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        } catch (error) {
            setErrorMessage('Error creating blog')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>{user?.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
            <Togglable buttonLabel="new blog">
                <BlogsForm createBlog={createBlog} setErrorMessage={setErrorMessage} setNotification={setNotification}/>
            </Togglable>
            <div>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} handleBlogUpdate={handleBlogUpdate} handleBlogRemoval={handleBlogRemoval}/>
              )}
            </div>
        </div>
    )
}

export default BlogsPage
  