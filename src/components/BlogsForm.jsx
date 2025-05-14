import { useState } from 'react'
import blogService from '../services/blogs'

const BlogsForm = ({ setErrorMessage, setNotification, createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleBlogSubmit = async (event) => {
        event.preventDefault()
        try {
            await createBlog({
                title,
                author,
                url
            })
            setTitle('')
            setAuthor('')
            setUrl('')
            setNotification(`a new blog ${title} by ${author} added`)
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
            <form onSubmit={handleBlogSubmit}>
                <div>
                    <label htmlFor="title">title:</label>
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                <label htmlFor="author">author:</label>
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="url">url:</label>
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )

}

export default BlogsForm